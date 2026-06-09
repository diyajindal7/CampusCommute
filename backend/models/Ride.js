const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    seats: {
      type: Number,
      required: true,
    },

    requests: [
  new mongoose.Schema({
    email: String,

    status: {
      type: String,
      default: "pending",
    },
  }),
],

createdBy: {
  type: String,
  required: true,
},

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ride", rideSchema);