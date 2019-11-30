const express = require("express");
const router = express.Router();

const UserModel = require("../models/user");

const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  if (!email || !password || !firstname || !lastname)
    return res.status(400).send("send everything mate you are missing inputs!!!!!");

  //input Validation
  if (!isEmail(email) || password.length < 8 || password.length > 20)
    return res.status(400).send("Proper inputs mate!!!");
  try {
    const hashPass = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT, 10));

    const user = new UserModel({
      email,
      password: hashPass,
      firstname,
      lastname
    });

    await user.save();
  } catch (error) {
    return res.status(500).json("Damn Bruh SadFace");
  }
  return res.status(201).send("Ready to go mate!!!");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).send("Please give all the information");
  const user = await UserModel.findOne({ email }).exec();

  if (!user) return res.status(400).send("there is no such user Bruh!!!");

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) return res.status(400).send("Wrong Password Bruhh!!!!!");

  const accessToken = jwt.sign(
    {
      userId: user.id
    },
    process.env.JWT_SECRET
  );

  return res.status(200).json({ accessToken, user });
});

module.exports = router;
