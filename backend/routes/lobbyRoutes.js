const express = require("express");
const Lobby = require("../models/Lobby");

const router = express.Router();

router.post("/create", async (req, res) => {

  try {

    const {
      title,
      destination,
      createdBy,
    } = req.body;

    const lobby =
      await Lobby.create({
        title,
        destination,
        createdBy,
      });

    res.json({
      success: true,
      lobby,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

router.get("/", async (req, res) => {

  try {

    const lobbies =
      await Lobby.find();

    res.json(lobbies);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});



router.get(
  "/my/:email",
  async (req, res) => {

    try {

      const lobbies =
        await Lobby.find({
          createdBy:
            req.params.email,
        });

      res.json(lobbies);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);


router.post("/:id/join", async (req, res) => {

  try {

    const { email } = req.body;

    const lobby =
      await Lobby.findById(
        req.params.id
      );

    if (!lobby) {
      return res.status(404).json({
        success: false,
        message: "Lobby not found",
      });
    }

    if (
      !lobby.members.includes(email)
    ) {
      lobby.members.push(email);
    }

    await lobby.save();

    res.json({
      success: true,
      message: "Joined Lobby",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});









router.post("/:id/leave", async (req, res) => {

  try {

    const { email } = req.body;

    const lobby =
      await Lobby.findById(
        req.params.id
      );

    if (!lobby) {
      return res.status(404).json({
        success: false,
        message: "Lobby not found",
      });
    }

    lobby.members =
      lobby.members.filter(
        (member) =>
          member !== email
      );

    await lobby.save();

    res.json({
      success: true,
      message: "Left Lobby",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});



router.delete("/:id", async (req, res) => {

  try {

    await Lobby.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Lobby deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});





module.exports = router;