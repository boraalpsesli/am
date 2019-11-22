const express = require("express");
const router = express.Router();
const tokenVerifier = require("../middleware/tokenVerifier");

router.get("/me", tokenVerifier, async (req, res) => {
  return res.status(200).json(req.user);
});

router.post("/addFavorite", tokenVerifier, async (req, res) => {
  const { user } = req;
  const { animeId } = req.body;
  if (!animeId || typeof animeId !== "number") return res.status(400).send("enter valid anime id");

  if (user.favorites.includes(animeId)) return res.status(400).send("This anime is already in your favorite Mate!!!");

  const newFavorites = [...user.favorites, animeId];
  try {
    await user.set({ favorites: newFavorites }).save();
    return res.status(200).send(animeId + " is Favorited");
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/deleteFavorite", tokenVerifier, async (req, res) => {
  const { user } = req;
  const { animeId } = req.body;
  if (!animeId || typeof animeId !== "number") return res.status(400).send("enter valid anime id");

  if (!user.favorites.includes(animeId)) return res.status(400).send("This anime is not in your favorite Mate!!!");

  const indexOfAnime = user.favorites.indexOf(animeId);
  user.favorites.splice(indexOfAnime, 1);
  user.save();
  return res.status(200).send("Successfully Deleted");
});
module.exports = router;
