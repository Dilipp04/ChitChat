const express = require("express");
const protect = require("../Middleware/authMiddleware");
const Router = express.Router();
const {
  allMessages,
  sendMessage,
} = require("../Controllers/messageController");

Router.get("/:chatId", protect, allMessages);
Router.post("/", protect, sendMessage);

module.exports = Router;
