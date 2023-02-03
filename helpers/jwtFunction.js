const jwt = require("jsonwebtoken");
const jwtConfig = process.env.JWT_CONFIG;
const bcrypt = require("bcrypt");

module.exports = {
  verifyToken: async (req, res, next) => {
    const token =
      req.body.token || req.query.token || req.headers["authorization"];
    if (!token) {
      return res.json({
        success: false,
        messege: "Token Required",
      });
    }
    try {
      const decode = await jwt.verify(token, process.env.JWT_SALT);
      req.user = decode;
      return next();
    } catch (err) {
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
