const mongoose = require("mongoose");

const AddEventSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
      enum: ["SetAddress", "SetPhoneNumber", "AskInvitee", "SetCustom"],
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
    selectedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    meetingId: {
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
AddEventSchema.path("value").validate(function (value) {
  return (
    value !== "AskInvitee" ||
    (!this.location && !this.locationAdd && !this.callOption && !this.customize)
  );
}, "No additional fields should be provided with AskInvitee value");

module.exports = mongoose.model("AddEvent", AddEventSchema);
