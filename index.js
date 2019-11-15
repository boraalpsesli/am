const express = require("express");
const mongoose = require("mongoose");
const logger = require("./middleware/logger");
const userRouter = require("./routes/users");
const App = express();

App.use(logger);
App.use(express.json());
App.use(express.urlencoded({ extended: false }));

App.get("/", (req, res) => res.send("<h1>Animatrix-Server</h1>"));
App.use("/users", userRouter);

mongoose
  .connect("mongodb+srv://boraalpsesli:boraalp2@animatrix-qy0xl.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("dbconnected"))
  .catch(err => console.log("dbcouldnotconnect"));

App.listen(5000, () => console.log("Server started on  port 50000"));
