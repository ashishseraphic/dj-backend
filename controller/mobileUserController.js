const user = require('../model/userModel');
const msg = require('../messageString');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtConfig = process.env.JWT_CONFIG;
const emailValidator = require('email-validator');
const verifyToken = require('../config/jwtConfig')
// const nodemailer = require('nodemailer');
const otp = require('../otp module/otp');
// const { config } = require('dotenv');
// const generateOTP = require('../otp module/otpCreate');
const firebase = require('../config/firebaseToken')



const saltRounds = 12;


const controller = {

    async login(req, res) {
        try {
            const name = req.body.userName
            const token = req.body
            const getData = await firebase.postReq(token)
            console.log('check the getData res - ', getData, name)
            const phoneNumber = getData.users[0].phoneNumber
            const firebaseUId = getData.users[0].localId

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
                    })
                    console.log("user try to Signup", newUser);
                    const jwtToken = jwt.sign({
                        id: newUser._id,
                    }, jwtConfig)
                    newUser.save().then(result => {
                        // otp.Sendmail(email, otpCode);
                        res.status(200).json({
                            message: "signup successfully",
                            data: result, jwtToken
                        })
                    })
                }

                if (logInAuth) {
                    console.log("user try to login")

                    const newUser = {
                        userName: req.body.userName,
                        phoneNumber: phoneNumber,
                        firebaseUId: firebaseUId,
                    }
                    const jwtToken = jwt.sign({
                        id: newUser._id,
                    }, jwtConfig)

                    res.status(200).json({
                        message: "LogIn successfully",
                        data: newUser, jwtToken
                    })
                }
            } catch (err) {
                console.log("error found when send req",err);
                res.status(500).json({
                    msg: "SERVER ERROR",
                    errormsg: err.message
                    
                })
            }

        } catch (err) {
            console.log('Some issue while mobile login - ', err)
        }

    },








};


module.exports = controller;