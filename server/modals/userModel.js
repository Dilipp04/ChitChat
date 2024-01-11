const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userModel = new mongoose.Schema(
  {
    username: { type: String ,unique:true, require: true },
    email: { type: String,unique:true, require: true },
    password: { type: String, require: true },
  },
  {
    timeStamp: true,
  }
);

userModel.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
};

userModel.pre("save", async function(next){
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const User = mongoose.model("User", userModel);
module.exports = User;
