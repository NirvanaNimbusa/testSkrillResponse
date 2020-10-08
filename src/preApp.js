const express = require("express");
const routes = require("./routes");

const app = express();
app.use(express.json({ extended: false }));
app.use("/api", routes);

module.exports = app;
