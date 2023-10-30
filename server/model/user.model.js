const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  vote: { type: String },
  role:{type:String, required:true}
});

const UserModel = mongoose.model("UserData", User);

module.exports = UserModel;
