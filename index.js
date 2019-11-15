const express = require("express");

const App = express();
const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
  next();
};

App.use(logger);
App.get("/", (req, res) => res.send("<h1>Animatrix-Server</h1>"));

App.listen(5000, () => console.log("Server started on  port 50000"));
