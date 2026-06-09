const express =
require("express");

const Message =
require("../models/Message");

const router =
express.Router();

router.get(
  "/:lobbyId",
  async (req, res) => {

    try {

      const messages =
        await Message.find({
          lobbyId:
            req.params.lobbyId,
        });

      res.json(messages);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  }
);

module.exports = router;