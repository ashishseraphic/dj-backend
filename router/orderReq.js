const router = require("express").Router();
const {
  addOrderReq,
  getOrderReq,
  getAllOrderReq,
  deleteOrderReq,
  deleteAllOrderReq,
  orderAction,
  getOrderByStatus,
} = require("../controller/orderReq");
const { verifyToken } = require("../helpers/jwtFunction");
const { upload } = require("../multerFile/multer");

const cpUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
  { name: "voiceMessage", maxCount: 1 },
]);
// const img = upload.single('image')
// const ved = upload.single('vedio')

router.post("/addorderrequest", cpUpload, verifyToken, addOrderReq);
router.post("/getorderrequest", verifyToken, getOrderReq);
router.get("/getallorderrequest", getAllOrderReq);
router.delete("/deleteorderrequest/:id", deleteOrderReq);
router.delete("/deleteallorderrequest", deleteAllOrderReq);
router.patch("/orderaction", verifyToken, orderAction);
router.post("/getorderbystatus", verifyToken, getOrderByStatus);

module.exports = router;
