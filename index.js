const express = require("express");
const app = express();
const router = require("./router/router");
var cors = require("cors");
require("dotenv").config();
require("./dataBase/dataBase");



app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(
    `Server successfully created with ${process.env.HOST}${process.env.PORT}`
  );
});

app.use("/", router);
