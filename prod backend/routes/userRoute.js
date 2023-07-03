const express = require("express");
const {
  conversationRoute,
  getConversation,
  startConvosFollowings,
} = require("../controllers/conversation");
const {
  addEvent,
  getEvents,
  createEvent,
  updateEvent,
} = require("../controllers/event");
const {
  meetingRoute,
  getMeeting,
  startMeetFollowings,
} = require("../controllers/meeting");
const { addMessages, getMessages } = require("../controllers/messages");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  getSingle,
  getFriend,
  followUser,
  unfollowUser,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser", protect, getUser);
router.get("/getusers", protect, getUsers);
router.delete("/:id", protect, deleteUser);
//router.get("/:id", protect, getSingle);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", protect, updateUser);
router.patch("/changepassword", protect, changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);

// Conversation routes
router.post("/conversations", conversationRoute);
router.get("/conversations/:userId", getConversation);
router.get("/find/:firstUserId/:secondUserId", startConvosFollowings);

// Messages routers
router.post("/messages", addMessages);
router.get("/messages/:conversationId", getMessages);

// Get Friends & Followers
router.get("/friends/:userId", getFriend);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unfollowUser);

// Meeting routes
router.post("/meeting", meetingRoute);
router.get("/meeting/:userId", getMeeting);
router.get("/findmeeting/:firstUserId/:secondUserId", startMeetFollowings);

// Event routers

router.post("/events", addEvent);

// create Event
router.post("/postevents", createEvent);

router.get("/events/:meetingId", getEvents);
router.patch("/updateuser", protect, updateEvent);

// Add Event Setup

module.exports = router;
