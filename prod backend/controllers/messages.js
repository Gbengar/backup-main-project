const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// add

const addMessages = asyncHandler(async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(err);
  }
});

// get
const getMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = { addMessages, getMessages };
