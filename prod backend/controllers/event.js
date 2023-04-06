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

module.exports = { addEvent, getEvents };
