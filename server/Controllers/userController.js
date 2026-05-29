const User = require("../modals/userModel");
const generateToken = require("../Config/generateToken");

const loginController = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await user.matchPassword(password))) {
    return res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      token: generateToken(user._id),
    });
  } else {
    return res.status(400).json({ message: "Invalid Credential" });
  }
};

const registerController = async (req, res) => {
  const { username, email, password, profilePic } = req.body;
  //check all fields
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Missing Credentials" });
  }

  //user exist check
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "User already exist" });
  }

  //Username exist check
  const userNameExist = await User.findOne({ username });
  if (userNameExist) {
    return res.status(400).json({ message: "UserName already exist" });
  }

  //Create User in db
  const user = await User.create({ username, email, password, profilePic });
  if (!user) {
    return res.status(400).json({ message: "Registration error" });
  }
  return res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    profilePic: user.profilePic,
    token: generateToken(user._id),
  });
};

const fetchAllUsersController = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { username: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).find({
    _id: { $ne: req.user._id },
  });
  return res.send(users);
};
module.exports = {
  loginController,
  registerController,
  fetchAllUsersController,
};
