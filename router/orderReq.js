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

router.post("/addOrderRequest", cpUpload, verifyToken, addOrderReq);
router.get("/getOrderRequest",verifyToken, getOrderReq);
router.get("/getAllOrderRequest", getAllOrderReq);
router.delete("/deleteOrderRequest/:id", deleteOrderReq);
router.delete("/deleteAllOrderRequest", deleteAllOrderReq);
router.patch("/orderAction", verifyToken, orderAction);
router.post("/getOrderByStatus", verifyToken, getOrderByStatus);

module.exports = router;
