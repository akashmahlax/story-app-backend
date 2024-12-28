const express = require("express");
const Story = require("../models/story");
const User = require("../models/user");
const router = express.Router();

router.post("/create", async (req, res) => {
  const { userId, content } = req.body;
  try {
    const story = await Story.create({ user: userId, content });
    res.status(201).json(story);
  } catch (err) {
    res.status(400).json({ error: "Error creating story" });
  }
});

router.get("/feed/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate("following");
    const stories = await Story.find({ user: { $in: user.following } })
      .populate("user")
      .sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: "Error fetching feed" });
  }
});

module.exports = router;
