const express = require("express");
const protect = require("../Middleware/authMiddleware");
const { accessChat, fetchChat } = require("../Controllers/chatController");
const Router = express.Router();

Router.post("/", protect, accessChat);
Router.get("/", protect, fetchChat);

module.exports = Router;
