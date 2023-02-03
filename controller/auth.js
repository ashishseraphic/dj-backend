const user = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtConfig = process.env.JWT_CONFIG;
const firebase = require("../helpers/firebasePostReq");

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
            jwtConfig
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
            jwtConfig
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

    let { email, password } = req.body.form
    let selectedRole = req.body.selectedRole

    try {
      const logInAuth = await user.findOne({ email });
      if (!logInAuth) {
        const hassword = await bcrypt.hash(password, saltRounds)
        const newData = await user.create({
          email: email,
          password: hassword,
          selectedRole: selectedRole,
        })
        const jwtToken = jwt.sign({
          id: newData._id,
        }, jwtConfig)

        newData.save().then(result => {
          res.status(200).json({
            message: msg.success,
            data: result, jwtToken
          })
        })
      }

      if (logInAuth) {

        if (selectedRole != logInAuth.selectedRole) {
          res.json({
            message: 'data not found'
          })
        } else {
          const hassword = await bcrypt.compare(password, logInAuth.password)
          if (!hassword) {
            res.json({
              message: 'password not match'
            })
          }
          const jwtToken = jwt.sign({
            id: newData._id,
          }, jwtConfig)

          logInAuth.save().then(result => {
            res.json({
              status: true,
              message: 'successfully logIn',
              data: result, jwtToken
            })
          })
        }
      }
    } catch (err) {
      res.status(500).json({
        msg: "SERVER ERROR",
        errormsg: err.message
      })
    }
  },



};
