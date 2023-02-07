const router = require("express").Router();

// Routes
const authRouter = require("./auth");
const orderRouter = require("./orderReq")

router.use("/auth", authRouter);
router.use("/order", orderRouter);


module.exports = router;
