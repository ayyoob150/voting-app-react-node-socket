const UserModel = require("../model/user.model");

const updateUser = async (req, res) => {
  try {
    const userupdate = await UserModel.findOneAndUpdate(
      { email: req.body.email },
      { vote: req.body.vote },
      {
        new: true
      }
    );

    if (userupdate) {
      return res.json({ status: "Ok", userupdate: true });
    } else {
      res.json({ status: "Error", userupdate: false });
    }
  } catch (e) {
    console.log(e);
  }
};
module.exports = updateUser;
