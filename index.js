const express = require("express");
const mongoose = require("mongoose")
const cors = require('cors');

const dotenv = require("dotenv");

const logger = require("./middleware/logger");
const AuthRouter = require("./routes/auth");
const UserRouter = require("./routes/user");

dotenv.config();
const startserver = async () => {
  const App = express();

  App.use(cors());
  App.use(logger);
  App.use(express.json());
  App.use(express.urlencoded({ extended: false }));

  App.get("/", (req, res) => res.send("<h1>Animatrix-Server</h1>"));
  App.use("/auth", AuthRouter);
  App.use("/user", UserRouter);
  await mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  App.listen(5000, () => console.log("Server started on  port 50000"));
};
startserver();
