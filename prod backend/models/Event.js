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
      enum: [
        "SetAddress",
        "SetPhoneNumber",
        "AskInvitee",
        "SetCustom",
        "SetReminder",
        "SetRecurring",
        "Public Holiday",
        "Christian",
        "Observance",
        "Season",
        "Local holiday",
        "Clock change/Daylight Saving Time",
      ],
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
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    // Add the recurringRule field for SetRecurring
    rrule: {
      type: String,
      required: function () {
        return this.value === "SetRecurring";
      },
    },
  },
  {
    strict: true,
    timestamps: true,
  }
);

EventSchema.path("value").validate(function (value) {
  return (
    (value !== "AskInvitee" ||
      (!this.location &&
        !this.locationAdd &&
        !this.callOption &&
        !this.customize &&
        !this.recurringRule)) &&
    (value !== "SetReminder" ||
      (!this.location &&
        !this.locationAdd &&
        !this.callOption &&
        !this.customize &&
        !this.recurringRule)) &&
    (value !== "Public Holiday" ||
      (!this.location &&
        !this.locationAdd &&
        !this.callOption &&
        !this.customize &&
        !this.recurringRule)) &&
    (value !== "Christian" ||
      (!this.location &&
        !this.locationAdd &&
        !this.callOption &&
        !this.customize &&
        !this.recurringRule)) &&
    (value !== "Observance" ||
      (!this.location &&
        !this.locationAdd &&
        !this.callOption &&
        !this.customize &&
        !this.recurringRule)) &&
    (value !== "Season" ||
      (!this.location &&
        !this.locationAdd &&
        !this.callOption &&
        !this.customize &&
        !this.recurringRule)) &&
    (value !== "Local holiday" ||
      (!this.location &&
        !this.locationAdd &&
        !this.callOption &&
        !this.customize &&
        !this.recurringRule)) &&
    (value !== "Clock change/Daylight Saving Time" ||
      (!this.location &&
        !this.locationAdd &&
        !this.callOption &&
        !this.customize &&
        !this.recurringRule))
  );
}, "No additional fields should be provided with AskInvitee or SetReminder value");

module.exports = mongoose.model("Event", EventSchema);
