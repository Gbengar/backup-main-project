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
  const { meetingId, title, start, end, status, rejectionReason } = req.body;

  // Validation
  if (!title || !start || !end) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Create new event
  const event = await Event.create({
    meetingId,
    title,
    start,
    end,
    status,
    rejectionReason,
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
