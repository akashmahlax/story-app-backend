const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/follow", async (req, res) => {
  const { userId, followId } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { $push: { following: followId } });
    res.json({ message: "Followed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error following user" });
  }
});

router.post("/unfollow", async (req, res) => {
  const { userId, unfollowId } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { $pull: { following: unfollowId } });
    res.json({ message: "Unfollowed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error unfollowing user" });
  }
});

module.exports = router;
