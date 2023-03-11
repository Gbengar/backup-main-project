const express = require("express");
const {
  conversationRoute,
  getConversation,
} = require("../controllers/conversation");
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

// Messages routers

router.post("/messages", addMessages);
router.get("/messages/:conversationId", getMessages);

module.exports = router;
