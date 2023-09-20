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
    rrule,
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
    (value === "SetRecurring" && !rrule) ||
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
    rrule: value === "SetRecurring" ? rrule : undefined,
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

// update individual Event

const updateEvent = asyncHandler(async (req, res) => {
  const eventId = req.params.id;
  const {
    eventName,
    start,
    end,
    duration,
    reminder,
    value, // This field determines the type of event
    location, // This is the previous location
    locationAdd,
    callOption,
    meetingDescription,
    customize, // This is the new field for custom location
  } = req.body;

  // Validation
  if (!eventName || !start || !end || !duration || !reminder) {
    res.status(400);
    throw new Error("Please provide valid options");
  }

  // Find the event by ID
  const event = await Event.findById(eventId);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  // Check if any fields have changed
  let updated = false;

  if (event.eventName !== eventName) {
    event.eventName = eventName;
    updated = true;
  }

  if (event.start !== start) {
    event.start = start;
    updated = true;
  }

  if (event.end !== end) {
    event.end = end;
    updated = true;
  }

  if (event.duration !== duration) {
    event.duration = duration;
    updated = true;
  }

  if (event.reminder !== reminder) {
    event.reminder = reminder;
    updated = true;
  }

  if (event.value !== value) {
    event.value = value;
    updated = true;

    // Handle the removal of fields based on the new value
    if (value === "SetCustom") {
      // Remove the previous location and set customize
      event.location = undefined;
      event.locationAdd = undefined;
      event.customize = customize;
    } else {
      // If the value is not "SetCustom," delete the location field
      event.location = undefined;
      event.locationAdd = undefined;
    }

    if (value === "SetAddress") {
      // Remove the previous location and set customize
      event.location = location;
      event.locationAdd = locationAdd;
      event.customize = undefined;
    } else {
      // If the value is not "SetCustom," delete the location field
      event.location = undefined;
    }
  }

  if (event.locationAdd !== locationAdd) {
    event.locationAdd = locationAdd;
    updated = true;
  }

  if (event.callOption !== callOption) {
    event.callOption = callOption;
    updated = true;
  }

  if (event.meetingDescription !== meetingDescription) {
    event.meetingDescription = meetingDescription;
    updated = true;
  }

  if (updated) {
    // Save the updated event only if any fields have changed
    const updatedEvent = await event.save();
    res.status(200).json(updatedEvent);
  } else {
    // No updates were made
    res.status(200).json(event);
  }
});

// update status.
const updateEventUserStatus = asyncHandler(async (req, res) => {
  const eventId = req.params.id;
  const { userId, status } = req.body;

  // Validation
  if (!userId || (status !== "accept" && status !== "reject")) {
    res.status(400);
    throw new Error(
      "Please provide a valid userId and status (accept or reject)."
    );
  }

  try {
    // Find the event by ID
    const event = await Event.findById(eventId);

    if (!event) {
      res.status(404);
      throw new Error("Event not found");
    }

    // Check if the userStatuses contain the given userId
    const userStatus = event.userStatuses.find((userStatus) =>
      userStatus.userId.equals(userId)
    );

    if (!userStatus) {
      res.status(404);
      throw new Error("User not found in event userStatuses");
    }

    // Update the userStatus with the new status
    userStatus.status = status;

    // Save the updated event
    await event.save();

    // Update the overall event status
    await event.updateStatuses();

    res.status(200).json({ message: "User status updated successfully" });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// ... Other code remains the same

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
// Delete Event

const deleteEvent = asyncHandler(async (req, res) => {
  const eventId = Event.findById(req.params.id);

  if (!eventId) {
    res.status(404);
    throw new Error("User not found");
  }

  await eventId.deleteOne();
  res.status(200).json({
    message: "User deleted successfully",
  });
});
module.exports = {
  addEvent,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  updateEventUserStatus,
};
