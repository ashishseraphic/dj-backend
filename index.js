const express = require("express");
const app = express();
const router = require("./router/router");
var cors = require("cors");
require("dotenv").config();
require("./dataBase/dataBase");
const path =require("path")
const fs = require('fs')




app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(
    `Server successfully created with ${process.env.HOST}${process.env.PORT}`
  );
});

const fixtures = require("./helpers/fixture");
fixtures.fixtureUser();

app.use('/static',express.static(path.join(__dirname, 'uploads')));


app.use("/", router);
