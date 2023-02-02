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


module.exports = controller;