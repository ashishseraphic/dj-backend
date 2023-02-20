const user = require("../model/userModel");
const jwt = require("jsonwebtoken");
const firebase = require("../helpers/firebasePostReq");
const emailValidator = require('email-validator')

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
            userName: userName,
            phoneNumber: phoneNumber,
            firebaseUId: firebaseUId,
            role,
          });
          const savedData = await newUser.save();
          const jwtToken = jwt.sign(
            {
              id: newUser._id,
            },
            process.env.JWT_CONFIG
          );
          res.status(200).json({
            status: "success",
            message: "User has been registered successfully",
            data: { user: savedData, token: jwtToken },
          });
        }

        if (logInAuth) {
          const jwtToken = jwt.sign(
            {
              id: logInAuth._id,
            },
            process.env.JWT_CONFIG
          );
          res.status(200).json({
            status: "success",
            message: "Logged in successfully",
            data: { user: logInAuth, token: jwtToken },
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
    console.log("check",req.body);
    let { email, password, role = "dj" } = req.body;

    try {
      const logInAuth = await user.findOne({ email });

      // If user donot have entry in DB than register handler
      // if (!emailValidator.validate(email)) {
      //   res.json({
      //     status: false,
      //     message: "Please Enter a Valid Email Address",
      //   });
      // }
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

  djIdAccepte: async (req, res) => {
    const { id } = req.user;
    const { isAccepting } = req.body;
    console.log(id);

    try {
      const acceptingStatus = await user.findOne({ _id: id })

      if (acceptingStatus.isAccepting == isAccepting) {
        res.json({
          status: "success",
          message: "dJ Admin Accepted request",
          data: acceptingStatus,
        })
      }
      if (acceptingStatus.isAccepting != isAccepting) {
        acceptingStatus.isAccepting = isAccepting;
        const accepting = await acceptingStatus.save();
        res.json({
          status: "success",
          message: "Fetch Data Successfully",
          data: accepting,
        })
      }
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "Some issue while user authentication",
        data: err.message,
      });
    }
  },

  findUserbyId: async (req, res) => {
    const { id } = req.body
    console.log("req.id", id);
    try {
      const acceptingStatus = await user.findById({ _id: id })
      console.log("check id response", acceptingStatus);
      res.json({
        status: "success",
        message: "Fetch data successfully",
        data: acceptingStatus,
      })
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "Some issue while user authentication",
        data: err.message,
      });
    }
  }

};
