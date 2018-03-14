const express = require("express");
const app = express();
require("dotenv").config();

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("landing");
});

app.listen(process.env.PORT, () => console.log("Listening on Port: " + process.env.PORT));
