const User = require("../modals/userModel");
const Chat = require("../modals/chatModel");
const Message = require("../modals/messageModel");

const allMessages = async (req, res) => {
  try {
    const message = await Message.find({ chat: req.params.chatId })
      .populate("sender", "username email")
      .populate("receiver")
      .populate("chat");
    return res.status(200).json(message);
  } catch (error) {
    return res.status(400).send("Fetching all messages error");
  }
};
const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    return res.status(400).send("request body error");
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "username");
    message = await message.populate("chat");
    message = await message.populate("receiver");
    message = await User.populate(message, {
      path: "chat.users",
      select: "username email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    return res.json(message);
  } catch (error) {
    return res.status(400).send("send message error");
  }
};

module.exports = { allMessages, sendMessage };
