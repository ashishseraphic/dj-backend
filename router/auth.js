const router = require("express").Router();
const { userLogin,djLogin} = require("../controller/auth");

router.post("/djLogin",djLogin);
router.post("/mobileLogin", userLogin);


module.exports = router;
