const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();

const Meeting = require("../models/Meeting");

// new conversation

const meetingRoute = asyncHandler(async (req, res) => {
  const { senderId, receiverId } = req.body; // Assuming senderId and receiverId are the correct property names
  let receiverIds = [];

  // Check if receiverId is an array of user IDs
  if (Array.isArray(receiverId)) {
    receiverIds = receiverId;
  } else {
    receiverIds.push(receiverId);
  }

  const newMeeting = new Meeting({
    members: [senderId, ...receiverIds],
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

// Delete Meeting.

const deleteMeeting = asyncHandler(async (req, res) => {
  const meetingId = Meeting.findById(req.params.id);

  if (!meetingId) {
    res.status(404);
    throw new Error("User not found");
  }

  await meetingId.deleteOne();
  res.status(200).json({
    message: "User deleted successfully",
  });
});

module.exports = {
  meetingRoute,
  getMeeting,
  startMeetFollowings,
  deleteMeeting,
};
