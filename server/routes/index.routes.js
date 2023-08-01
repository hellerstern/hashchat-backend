const express = require("express");
const app = express();

app.use(require("./user.routes"));
app.use(require("./auth.routes"));

module.exports = app;
