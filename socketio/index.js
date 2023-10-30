const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

const app = express();
dotenv.config();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// put here your mongodb url
const url = process.env.CONNECT_DB;

//change the db name what is present or what you have create in in mongodb
const dbName = "test";

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

io.on("connection", async (socket) => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("votes");
  const changeStream = collection.watch({
    fullDocument: "updateLookup",
  });

  changeStream.on("change", async (change) => {
    if (change.operationType === "update") {
      const updatedVotes = await collection.find().toArray();
      io.emit("Votes", updatedVotes);
    }
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
