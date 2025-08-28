// init server
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

// init middlewares
app.use(morgan("dev")) // log request len console
app.use(helmet()) // bao mat ung dung
app.use(compression()) // nen du lieu trc khi gui ve client
// init db
require("./dbs/init.mongodb.js")
// init route


// handling error

module.exports = app; // export de noi khac dung