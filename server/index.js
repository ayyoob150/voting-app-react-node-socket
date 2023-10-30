const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const VoteModel = require("./model/vote.model");
const UserModel = require("./model/user.model");
const signupUser = require("./routes/signup");
const loginuser = require("./routes/login");
const bodyParser = require("body-parser");
const updateUser = require("./routes/user");
const votepost = require("./routes/vote");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
app.use(cors());
dotenv.config();
const server = http.createServer(app);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Access Prohibited");
});

app.use("/user", signupUser);
app.use("/user", loginuser);
app.use("/", updateUser);
app.use("/", votepost);


//you have to set/put your mongodb url here
mongoose
  .connect(process.env.CONNECT_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("you are connected with db");
    const admin = await UserModel.findOne({
      email: "admin@admin.com",
      role: "admin",
    });
    if (!admin) {
      bcrypt.hash("admin1234", saltRounds, async function (err, hash) {
        UserModel.create({
          email: "admin@admin.com",
          password: hash,
          vote: "none",
          role: "admin",
        });
      });
    }

    const vote = await VoteModel.find();
    if (!vote) {
      VoteModel.insertMany([
        {
          nominee: "BJP",
          allVotes: [],
        },
        {
          nominee: "INC",
          allVotes: [],
        },
        {
          nominee: "BSP",
          allVotes: [],
        },
        {
          nominee: "SPA",
          allVotes: [],
        },
      ]);
    }
  })
  .catch((e) => console.log(e));

server.listen(1000, () => {
  console.log("Server started");
});
