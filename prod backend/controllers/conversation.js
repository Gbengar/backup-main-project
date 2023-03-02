const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();

const Conversation = require("../models/Conversation");

// new conversation

const conversationRoute = asyncHandler(async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderID, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
});
// get conversation of user

const getConversation = asyncHandler(async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = { conversationRoute, getConversation };
