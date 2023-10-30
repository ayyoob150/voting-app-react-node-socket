const mongoose = require("mongoose");

const Vote = new mongoose.Schema({
  nominee: { type: String, required: true, unique: true },
  allVotes: [String],
});

const VoteModel = mongoose.model("Vote", Vote);

module.exports = VoteModel;
