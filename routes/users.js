const express = require("express");
const router = express.Router();
const userModel = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send("Username or the password is missing...");
    return;
  }

  const newUser = new userModel({
    username,
    password
  });

  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
