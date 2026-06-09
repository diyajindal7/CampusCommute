const express = require("express");
const Notification =
  require("../models/Notification");

const router = express.Router();

router.get("/:email", async (req, res) => {
  try {

    const notifications =
      await Notification.find({
        email: req.params.email,
      }).sort({
        createdAt: -1,
      });

    res.json(notifications);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

module.exports = router;