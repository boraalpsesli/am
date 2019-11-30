const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");

const tokenVerifier = async (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) return res.status(401).send("Failed to Authorize");

  const accessToken = authorization.split(" ")[1];
  if (!accessToken) return res.status(401).send("Wrong format! should be a 'Baerer Token' mate!!!");

  try {
    const { userId } = jwt.verify(accessToken, process.env.JWT_SECRET);

    const user = await UserModel.findById(userId);
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = tokenVerifier;
