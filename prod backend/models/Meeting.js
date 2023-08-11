const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    confirmationStatus: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Meeting", MeetingSchema);
