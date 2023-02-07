const router = require("express").Router();
const {addOrderReq,getOrderReq,getAllOrderReq,deleteOrderReq,deleteAllOrderReq,orderAction,getOrderByStatus} = require("../controller/orderReq");
const {verifyToken}= require("../helpers/jwtFunction");
const {upload} = require("../multerFile/multer")

router.post("/addorderrequest",upload.single('image'),verifyToken,addOrderReq);
router.get("/getorderrequest",getOrderReq);
router.get("/getallorderrequest",getAllOrderReq);
router.delete("/deleteorderrequest/:id",deleteOrderReq);
router.delete("/deleteallorderrequest",deleteAllOrderReq);
router.patch("/orderaction",verifyToken,orderAction);
router.get("/getorderbystatus",verifyToken,getOrderByStatus);



module.exports = router;