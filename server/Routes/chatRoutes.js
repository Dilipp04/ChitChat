const express = require("express");
const protect = require("../Middleware/authMiddleware");
const { accessChat, fetchChat, deleteChat } = require("../Controllers/chatController");
const Router = express.Router();

Router.post("/", protect, accessChat);
Router.get("/", protect, fetchChat);
Router.delete("/:chatId", protect, deleteChat);

module.exports = Router;
