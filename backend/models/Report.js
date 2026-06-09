const mongoose = require("mongoose");

const reportSchema =
  new mongoose.Schema(
    {
      reportedBy: {
        type: String,
        required: true,
      },

      targetId: {
        type: String,
        required: true,
      },

      type: {
        type: String,
        required: true,
      },

      reason: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Report",
    reportSchema
  );