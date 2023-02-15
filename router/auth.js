const router = require("express").Router();
const { userLogin,djLogin,djIdAccepte,findUserbyId} = require("../controller/auth");
const { verifyToken } = require("../helpers/jwtFunction");

router.post("/djLogin",djLogin);
router.post("/mobileLogin", userLogin);
router.post("/djIdAccepte",verifyToken,djIdAccepte);
router.post("/findUserbyId",findUserbyId);


module.exports = router;
