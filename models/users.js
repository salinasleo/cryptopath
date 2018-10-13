const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  date: {type: Date}
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
