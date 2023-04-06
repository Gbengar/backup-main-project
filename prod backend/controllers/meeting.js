const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();

const Meeting = require("../models/Meeting");

// new conversation

const meetingRoute = asyncHandler(async (req, res) => {
  const newMeeting = new Meeting({
    members: [req.body.senderID, req.body.receiverId],
  });
  try {
    const savedMeeting = await newMeeting.save();
    res.status(200).json(savedMeeting);
  } catch (error) {
    res.status(500).json(error);
  }
});
// get conversation of user

const getMeeting = asyncHandler(async (req, res) => {
  try {
    const meeting = await Meeting.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json(error);
  }
});

const startMeetFollowings = asyncHandler(async (req, res) => {
  try {
    const meeting = await Meeting.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(meeting);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = { meetingRoute, getMeeting, startMeetFollowings };
