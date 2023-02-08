const user = require("../model/userModel");
const order = require("../model/orderModel");

module.exports = {
  addOrderReq: async (req, res) => {
    console.log("request data check for body - ",req.body);
    const {id} = req.user;
    console.log({id})
    const { message, songName, djId } = req.body;

    try {
      const songReq = await user.findOne({ _id: id });
      if (!songReq._id) {
        return res.json({
          status: "error",
          message: "User not found",
          data: null,
        });
      }
        let dataToSend = {
          userId: id,
          djId: djId,
          message: message,
          songName: songName,
        };
        if (req.files?.image) {
          dataToSend = {
            ...dataToSend,
            image: "static/" + req.files.image[0].filename,
          };
        }
        if (req.files?.video) {
          dataToSend = {
            ...dataToSend,
            video: "static/" + req.files.video[0].filename,
          };
        }
        if (req.files?.voiceMessage) {
          dataToSend = {
            ...dataToSend,
            voiceMessage: "static/" + req.files.voiceMessage[0].filename,
          };
        }
        const newData = await order.create(dataToSend);
        if (
          !newData.message &&
          !newData.video &&
          !newData.image &&
          !newData.songName &&
          !newData.voiceMessage
        ) {
          res.send({status:"Fails",message:"Atleast One Field Required"});
        } else {
          const savedData = await newData.save();
          res.status(200).json({
            status: "success",
            message: "Song request saved successfully",
            data: { user: savedData },
          });
        }
      
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "Some issue while user authentication",
        data: err.message,
      });
    }
  },

  getOrderReq: async (req, res) => {
    const { userId = "", djId = "" } = req.body;
    try {
      if (userId) {
        const getdata = await order.find({ userId });
        res.status(200).json({
          status: "success",
          message: "Order Data Found",
          data: { user: getdata },
        });
      }
      if (djId) {
        const getdata = await order.find({ djId });
        res.status(200).json({
          status: "success",
          message: "Order Data Found",
          data: { user: getdata },
        });
      }
    } catch (err) {
      console.log("error", err.message);
      res.json("res error", err);
    }
  },

  getAllOrderReq: async (req, res) => {
    try {
      const getdata = await order.find(req.body);
      console.log("get data", getdata);
      res.status(200).json({
        status: "success",
        message: "All Order Data Found",
        data: { user: getdata },
      });
    } catch (err) {
      console.log("error", err.message);
      res.json("res error", err);
    }
  },

  deleteOrderReq: async (req, res) => {
    console.log(req.param);
    try {
      const deleteData = await order.findByIdAndRemove({
        _id: req.params.id,
      });
      if (deleteData) {
        res.status(200).json({
          status: "success",
          message: "Order Data Delete Successfully",
        });
      }
    } catch (err) {
      console.log("error", err.message);
      res.json("res error", err);
    }
  },

  deleteAllOrderReq: async (req, res) => {
    try {
      const deleteData = await order.deleteMany(req.body);
      if (deleteData) {
        res.status(200).json({
          status: "success",
          message: "All Order Data Delete Successfully",
        });
      }
    } catch (err) {
      console.log("error", err.message);
      res.json("res error", err);
    }
  },

  orderAction: async (req, res) => {
    const orderId = req.body.id;
    console.log(orderId);
    try {
      if (req.body.id == "" || null) {
        return res.status(400).json({
          status: "fail",
          message: "Id is empty",
          data: null,
        });
      }

      let action = await order.findById(orderId);
      console.log("action", action);

      if (req.body.status == "") {
        res.json({
          status: "fail",
          message: "status field is Empty ",
          data: null,
        });
      }
      if (action.status == "approve") {
        res.json({
          status: "false",
          message: "Order Already Approved",
          data: null,
        });
      } else if (action.status == "reject") {
        res.json({
          status: "false",
          message: "Order Already Rejected",
          data: null,
        });
      } else if (action.status != req.body.status) {
        action.status = req.body.status;
        const actionStatus = await action.save();
        res.status(200).json({
          status: "success",
          message: "Fetch Data Successfully",
          data: { user: actionStatus },
        });
      }
    } catch (err) {
      console.log(err);
      res.json({ error: err.message });
    }
  },

  getOrderByStatus: async (req, res) => {
    const djId = req.user.id;
    console.log(djId);
    const { status } = req.body;

    try {
      if (!status) {
        res.send({
          status: "fail",
          message: "status field is Empty",
          data: null,
        });
      }
      const ordersRes = await order.find({ status, djId });
      res.send({
        status: "success",
        message: "All Approved request",
        data: ordersRes,
      });
    } catch (err) {
      res.json({});
    }
  },
};
