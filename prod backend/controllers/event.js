const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// add

const addEvent = asyncHandler(async (req, res) => {
  const newEvent = new Event(req.body);
  try {
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (error) {
    res.status(500).json(err);
  }
});

// Create Event
const createEvent = asyncHandler(async (req, res) => {
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
    reminder,
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
    (value === "SetReminder" &&
      (location || locationAdd || callOption || customize)) ||
    !start ||
    !end ||
    !duration ||
    !reminder
  ) {
    res.status(400);
    throw new Error("Please provide a valid option");
  }

  // Create new event
  const event = await Event.create({
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
    reminder,
  });

  if (event) {
    res.status(201).json(event);
  } else {
    res.status(400);
    throw new Error("Invalid event data");
  }
});

// get
const getEvents = asyncHandler(async (req, res) => {
  try {
    const events = await Event.find({
      meetingId: req.params.meetingId,
    });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = { addEvent, getEvents, createEvent };
