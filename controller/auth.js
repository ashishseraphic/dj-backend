const user = require("../model/userModel");
const jwt = require("jsonwebtoken");
const firebase = require("../helpers/firebasePostReq");

// helper methods
const { passwordHasher, passwordCompare } = require("../helpers/jwtFunction");

module.exports = {
  userLogin: async (req, res) => {
    try {
      const { userName, idToken, role = "user" } = req.body;
      const getData = await firebase.postReq(idToken);
      const phoneNumber = getData.users[0].phoneNumber;
      const firebaseUId = getData.users[0].localId;

      try {
        const logInAuth = await user.findOne({ phoneNumber });
        if (!logInAuth) {
          const newUser = await user.create({
            userName: req.body.userName,
            phoneNumber: phoneNumber,
            firebaseUId: firebaseUId,
            role,
          });
          const jwtToken = jwt.sign(
            {
              id: newUser._id,
            },
            process.env.JWT_CONFIG
          );

          const savedData = await newUser.save();
          res.status(200).json({
            status: "success",
            message: "User has been registered successfully",
            data: { user: savedData, token: jwtToken },
          });
        }

        if (logInAuth) {
          const newUser = {
            userName: userName,
            phoneNumber: phoneNumber,
            firebaseUId: firebaseUId,
            role,
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
            data: { user: newUser, token: jwtToken },
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

    try {
      const logInAuth = await user.findOne({ email });

      // If user donot have entry in DB than register handler
      if (!logInAuth) {
        const hassword = await passwordHasher(password);
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
            status: "error",
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
