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
      enum: ["accept", "reject", "pending"],
      default: "pending",
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
    userStatuses: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        status: {
          type: String,
          enum: ["accept", "reject", "pending"],
          default: "pending",
        },
      },
    ],
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

EventSchema.methods.updateStatuses = async function () {
  const allUsersAccepted = this.userStatuses.every(
    (userStatus) => userStatus.status === "accept"
  );
  const anyUserRejected = this.userStatuses.some(
    (userStatus) => userStatus.status === "reject"
  );

  if (anyUserRejected) {
    this.status = "reject";
  } else if (allUsersAccepted) {
    this.status = "accept";
  } else {
    this.status = "pending";
  }

  await this.save();
};

// This function populates userStatuses with the initial status for each user
EventSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.userStatuses = this.selectedUserId.map((userId) => ({
      userId,
      status: "pending",
    }));

    const acceptedValues = [
      "SetReminder",
      "SetRecurring",
      "Public Holiday",
      "Christian",
      "Observance",
      "Season",
      "Local holiday",
      "Clock change/Daylight Saving Time",
    ];

    if (acceptedValues.includes(this.value)) {
      this.userStatuses.forEach((userStatus) => {
        userStatus.status = "accept";
      });
      this.status = "accept";
    }
  }
  next();
});

module.exports = mongoose.model("Event", EventSchema);
