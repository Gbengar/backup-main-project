const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    duration: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },
    reminder: {
      type: mongoose.Schema.Types.Number,
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
    value: {
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
    location: {
      type: String,
      required: function () {
        return this.value === "SetAddress";
      },
    },
    locationAdd: {
      type: String,
      required: function () {
        return this.value === "SetAddress" && this.additionalInfo;
      },
    },
    callOption: {
      type: String,
      required: function () {
        return this.value === "SetPhoneNumber";
      },
      enum: ["call_me", "i_call"],
    },
    customize: {
      type: String,
      required: function () {
        return this.value === "SetCustom";
      },
    },
    eventName: {
      type: String,
      default: "",
    },
    meetingDescription: {
      type: String,
      default: "",
    },
    meetingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    selectedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    // Adding the "strict" option to prevent unexpected fields
    // and "timestamps" option to add "createdAt" and "updatedAt" fields
    strict: true,
    timestamps: true,
  }
);

// Adding the AskInvitee value, which doesn't require any other fields to be filled in
EventSchema.path("value").validate(function (value) {
  return (
    value !== "AskInvitee" ||
    (!this.location && !this.locationAdd && !this.callOption && !this.customize)
  );
}, "No additional fields should be provided with AskInvitee value");

module.exports = mongoose.model("Event", EventSchema);
