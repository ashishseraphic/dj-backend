const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/userModel");

module.exports = {
  verifyToken: async (req, res, next) => {
    let jwt_token = req.headers["authorization"];
    // console.log("check teh jwt token - ", jwt_token);
    let token = jwt_token.split(" ")[1];
    if (!token) {
      return res.json({
        success: false,
        messege: "Token Required",
      });
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_CONFIG);
      // console.log("check the decoded jwt token - ", jwt_token);
      req.user = decode;
      return next();
    } catch (err) {
      console.log("Some issue while decoding jwt token - ", err);
      return res.json({
        success: false,
        massage: "Invalid Token",
      });
    }
  },
  passwordHasher: async (password) => {
    try {
      const hassword = await bcrypt.hash(
        password,
        Number(process.env.JWT_SALT)
      );
      return hassword;
    } catch (err) {
      console.log(
        "Some issue while generating hashed password(jwtFunctions) - ",
        err
      );
    }
  },
  passwordCompare: async (password, hashedPassword) => {
    try {
      const hassword = await bcrypt.compare(password, hashedPassword);
      return hassword;
    } catch (err) {
      console.log(
        "Some issue while comparing passwords(jwtFunctions.js) - ",
        err
      );
    }
  },
};
