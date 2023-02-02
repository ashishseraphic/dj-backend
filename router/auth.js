const router = require("express").Router();
const userController = require("../controller/userController");
const { userLogin } = require("../controller/auth");

router.post("/login", userController.login);
router.post("/mobilelogin", userLogin);

module.exports = router;
