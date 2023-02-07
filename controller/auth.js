const user = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtConfig = process.env.JWT_CONFIG;
const firebase = require("../helpers/firebasePostReq");

// helper methods
const { passwordHasher, passwordCompare } = require("../helpers/jwtFunction");

const saltRounds = 12;

module.exports = {
  userLogin: async (req, res) => {
    try {
      const { userName, idToken } = req.body;
      //   const name = req.body.userName;
      //   const token = req.body;
      const getData = await firebase.postReq(idToken);
      // console.log("check the getData res - ", getData, name);
      const phoneNumber = getData.users[0].phoneNumber;
      const firebaseUId = getData.users[0].localId;

      console.log("get phoneNumber", phoneNumber);

      try {
        const logInAuth = await user.findOne({ phoneNumber });
        console.log("number", logInAuth);

        if (!logInAuth) {
          console.log("user try to Signup");
          const newUser = await user.create({
            userName: req.body.userName,
            phoneNumber: phoneNumber,
            firebaseUId: firebaseUId,
          });
          console.log("user try to Signup", newUser);
          const jwtToken = jwt.sign(
            {
              id: newUser._id,
            },
            process.env.JWT_CONFIG
          );
          newUser.save().then((result) => {
            // otp.Sendmail(email, otpCode);
            res.status(200).json({
              message: "signup successfully",
              data: result,
              jwtToken,
            });
          });
        }

        if (logInAuth) {
          console.log("user try to login");

          const newUser = {
            userName: userName,
            phoneNumber: phoneNumber,
            firebaseUId: firebaseUId,
          };
          const jwtToken = jwt.sign(
            {
              id: newUser._id,
            },
            process.env.JWT_CONFIG
          );

          res.status(200).json({
            status: "success",
            message: "Logged in successfully",
            data: {
              user: newUser,
              token: jwtToken,
            },
          });
        }
      } catch (err) {
        console.log("error found when send req", err);
        res.status(500).json({
          status: "error",
          message: "SERVER ERROR",
          data: err.message,
        });
      }
    } catch (err) {
      console.log("Some issue while mobile login - ", err);
    }
  },

  djLogin: async (req, res) => {
    let { email, password, role = "dj" } = req.body;
    let selectedRole = req.body.selectedRole;

    try {
      const logInAuth = await user.findOne({ email });

      // If user donot have entry in DB than register handler
      if (!logInAuth) {
        const hassword = await passwordHasher(password);
        console.log("check teh hash word here - ", hassword);
        const newData = await user.create({
          email: email,
          password: hassword,
          role,
        });
        const jwtToken = jwt.sign(
          {
            id: newData._id,
          },
          process.env.JWT_CONFIG
        );

        const savedData = await newData.save();
        res.status(200).json({
          status: "success",
          message: "User has been registered successfully",
          data: { user: savedData, token: jwtToken },
        });
      }

      // If user has an entry in DB than login handler
      if (logInAuth) {
        if (role != logInAuth?.role) {
          return res.send({
            status: "success",
            message: "No user found",
            data: null,
          });
        } else {
          const hassword = await passwordCompare(password, logInAuth.password);
          if (!hassword) {
            return res.send({
              status: "error",
              message: "Passwords mismatched",
              data: null,
            });
          }
          const jwtToken = jwt.sign(
            {
              id: logInAuth._id,
            },
            process.env.JWT_CONFIG
          );

          // const loginRes = await logInAuth.save();

          // Removing password from user object before sending api response
          delete logInAuth.password;

          res.json({
            status: "success",
            message: "User login successful",
            data: { user: logInAuth, token: jwtToken },
          });
        }
      }
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "Some issue while user authentication",
        data: err.message,
      });
    }
  },
};
