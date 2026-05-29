const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const app = express();
var cors = require("cors");
dotenv.config();

const corsOptions = {
  origin: "*",
  methods: "GET,POST,PUT,PATCH,DELETE,HEAD",
  Credential: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Get request is sent");
});

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const connectdb = async () => {
  try {
    const connect = await mongoose.connect(MONGO_URI);
    console.log("Database connection successfull");
  } catch (error) {
    console.log("Error in database connection", error);
  }
};
connectdb();

//Socket Server
const { createServer } = require("http");
const httpServer = createServer(app);
const { Server } = require("socket.io");

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
  pingTimeout: 60000,
});

const onlineUsers = new Map();

const getOnlineUserIds = () => Array.from(onlineUsers.keys());

io.on("connection", (socket) => {
  socket.on("setup", (userId) => {
    if (!userId) return;
    socket.userId = userId;
    const userSockets = onlineUsers.get(userId) || new Set();
    userSockets.add(socket.id);
    onlineUsers.set(userId, userSockets);
    socket.join(userId);
    socket.emit("connected");
    io.emit("online users", getOnlineUserIds());
  });

  socket.on("join chat", (room) => {
    socket.join(room);
  });

  socket.on("newMessage", (newMessageStatus) => {
    var chat = newMessageStatus.chat;
    if (!chat.users) {
      return console.log("chat.users not defined");
    }
    chat.users.forEach((user) => {
      if (user._id == newMessageStatus.sender._id) return;
      socket.in(user._id).emit("message received", newMessageStatus);
    });
  });

  socket.on("disconnect", () => {
    if (socket.userId) {
      const userSockets = onlineUsers.get(socket.userId);
      if (userSockets) {
        userSockets.delete(socket.id);
        if (userSockets.size === 0) {
          onlineUsers.delete(socket.userId);
        }
      }
      io.emit("online users", getOnlineUserIds());
    }
  });
});

httpServer.listen(PORT, () => {
  console.log("Server is running");
});
