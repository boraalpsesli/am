const express = require("express");
const logger = require("./middleware/logger");
const userRouter = require("./routes/users");
const App = express();

App.use(logger);
App.use(express.json());
App.use(express.urlencoded({ extended: false }));

App.get("/", (req, res) => res.send("<h1>Animatrix-Server</h1>"));
App.use("/users", userRouter);

App.listen(5000, () => console.log("Server started on  port 50000"));
