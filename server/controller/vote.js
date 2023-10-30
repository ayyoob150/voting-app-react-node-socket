const VoteModel = require("../model/vote.model");

const vote = async (req, res) => {
  try {
    const voteData = await VoteModel.find();
    if (voteData) {
      return res.send(voteData);
    } else {
      res.json({ status: "Error", voteData: false });
    }
  } catch (e) {
    console.log(e);
  }
};

const updateVote = async (req, res) => {
  VoteModel.findOne({ nominee: req.body.nominee })
    .then((vote) => {
      if (vote) {
        vote.allVotes.push(req.body.userId);
        return vote.save();
      } else {
        return null;
      }
    })
    .then((updatedVote) => {
      if (updatedVote) {
        res.json({ status: "Ok", user: true });
      }
    })
    .catch((err) => {
      res.json({ status: "Error", user: false });
    });
};

module.exports = { vote, updateVote};
