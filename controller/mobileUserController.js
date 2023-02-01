const user = require('../model/userModel');
const msg = require('../messageString');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtConfig = process.env.JWT_CONFIG;
const emailValidator = require('email-validator');
// const nodemailer = require('nodemailer');
const otp = require('../otp module/otp');
// const generateOTP = require('../otp module/otpCreate');


const saltRounds = 12;


const controller = {

    async login(req, res) {
        console.log("token", req.headers);
        console.log("token-2",req.body);


        try {
            const logInAuth = await user.findOne({ phoneNumber: req.body.phoneNumber });
            console.log("number");

            if (logInAuth) {

                const data = {
                    phoneNumber: req.body.phoneNumber,
                }
                const jwtToken = jwt.sign({
                    id: data._id,

                }, jwtConfig, { expiresIn: 60 * 1 });

                logInAuth.save().then((result) => {
                    res.json({ status: true, message: "login successfully", Data: result, jwtToken })
                }).catch((err) => {
                    res.json({ status: false, message: msg.invalid })
                })
            }
            else if (!logInAuth) {
                console.log("number 2");
                const newUser = await user.create({
                    userName: req.body.userName,
                    phoneNumber: req.body.phoneNumber,
                    selectedRole: req.body.selectedRole,
                })
                const jwtToken = jwt.sign({
                    id: newUser._id,
                }, jwtConfig)
                console.log("hello3");
                newUser.save().then(result => {
                    // otp.Sendmail(email, otpCode);
                    res.status(200).json({
                        message: "signup successfully",
                        data: result, jwtToken
                    })
                })
            }

        } catch (err) {
            res.status(500).json({
                msg: "SERVER ERROR",
                errormsg: err.message
            })
        }
    },








};


module.exports = controller;