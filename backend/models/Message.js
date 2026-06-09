const mongoose = require("mongoose");

const messageSchema =
  new mongoose.Schema(
    {
      sender: String,
      message: String,
      lobbyId: String,
    },
    {
      timestamps: true,
    }
  );


  

module.exports =
  mongoose.model(
    "Message",
    messageSchema
  );