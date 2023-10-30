const UserModel = require("../model/user.model");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const signupUser = async (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
    if(err){
      console.log("pasword hash err" , err);
      return res.json({ status: "Error", error: "Password error" });
    }
    try {
      const user = await UserModel.create({
        email: req.body.email,
        password: hash,
        vote: "",
        role:req.body.role
      });
      res.json({ status: "Ok" });
    } catch (err) {
      console.log(err);
      res.json({ status: "Error", error: "Email exist" });
    }
});
  
};

module.exports = signupUser;
