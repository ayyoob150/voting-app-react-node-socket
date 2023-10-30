const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  const { email, password,role } = req.body;

  try {
    const user = await UserModel.findOne({ email,role });

    if (!user) {
      return res.json({
        status: "Error",
        user: false,
        error: "User not found",
      });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.json({
          status: "Error",
          user: false,
          error: "Password comparison error",
        });
      }
      if (result) {
        res.json({ status: "Ok", user: true });
      } else {
        res.json({ status: "Error", user: false, error: "Incorrect password" });
      }
    });
  } catch (err) {
    res.json({ status: "Error", user: false, error: "Login error" });
  }
};

const findUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.params.id,
    });
    if (user) {
      return res.json({
        _id: user._id,
        email: user.email,
        vote: user.vote,
        role: user.role,
      });
    } else {
      res.json({ status: "Error", user: false });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { loginUser, findUser };
