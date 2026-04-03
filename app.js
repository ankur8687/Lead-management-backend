const express = require("express");

const app = express();

app.use(express.json());
const leadRoutes = require("./routers/leadroutes");
app.use("/api/leads" , leadRoutes);

module.exports = app;``