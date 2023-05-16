const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();

const AddEvent = require("../models/AddEvent");

const addEventSetup = asyncHandler(async (req, res) => {
  const {
    value,
    location,
    locationAdd,
    callOption,
    customize,
    eventName,
    meetingDescription,
    selectedUserId,
    additionalInfo,
    meetingId,
    start,
    end,
    duration,
  } = req.body;

  // Validation
  if (
    !value ||
    (value === "SetAddress" && !location) ||
    (value === "SetAddress" && additionalInfo && !locationAdd) ||
    (value === "SetPhoneNumber" && !callOption) ||
    (value === "SetCustom" && !customize) ||
    (value === "AskInvitee" &&
      (location || locationAdd || callOption || customize)) ||
    !start ||
    !end ||
    !duration
  ) {
    res.status(400);
    throw new Error("Please provide a valid option");
  }

  // Create new event
  const event = await AddEvent.create({
    value,
    location: value === "SetAddress" ? location : undefined,
    locationAdd:
      value === "SetAddress" && additionalInfo ? locationAdd : undefined,
    callOption: value === "SetPhoneNumber" ? callOption : undefined,
    customize: value === "SetCustom" ? customize : undefined,
    eventName,
    meetingDescription,
    selectedUserId,
    meetingId,
    start,
    end,
    duration,
  });

  if (event) {
    res.status(201).json(event);
  } else {
    res.status(400);
    throw new Error("Invalid event data");
  }
});

module.exports = { addEventSetup };
