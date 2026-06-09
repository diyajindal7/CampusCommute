const mongoose = require("mongoose");

const lobbySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    createdBy: {
      type: String,
      required: true,
    },

    members: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model(
    "Lobby",
    lobbySchema
  );