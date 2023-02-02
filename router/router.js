const router = require("express").Router();

// Routes
const authRouter = require("./auth");

router.use("/auth", authRouter);

module.exports = router;
