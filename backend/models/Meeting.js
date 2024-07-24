const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Meeting", MeetingSchema);
