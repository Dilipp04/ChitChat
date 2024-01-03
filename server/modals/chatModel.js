const mongoose = require("mongoose");
const Message = require("./messageModel");

const chatModel = mongoose.Schema(
  {
    chatName: {
      type: String,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timeStamp: true,
  }
);

chatModel.pre(
  "deleteOne",
  { document: false, query: true },
  async function (next) {
    try {
      
      const chatId = this.getFilter()._id;
      const result = await Message.deleteMany({ chat: chatId });
      if(result){
        next()
      }
    } catch (error) {
      return res.status(500).send("Deletion error")
    }
  }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;
