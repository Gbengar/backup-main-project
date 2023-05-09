const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  meetingId: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  option: {
    type: String,
    enum: ["SetAddress", "SetPhoneNumber", "AskInvitee", "SetCustom"],
  },
  status: {
    type: String,
    enum: ["accept", "reject", "reschedule"],
    default: "reschedule",
  },
  rejectionReason: {
    type: String,
  },
});

module.exports = mongoose.model("Event", EventSchema);
