const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
require("dotenv").config();
// const newsSiteUserData = require("./users.js")
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 3031;

//Users Schema

const UsersSchema = new mongoose.Schema({
  username: String,
  fullName: String,
  profileImg: String,
  email: String,
  password: String,
  isAdmin: Boolean,
});
const UserModel = mongoose.model("User", UsersSchema);

// get all users
app.get("/api/users", async (req, res) => {
  const users = await UserModel.find({});
  if (users.length == 0) {
    res.status(204).send({
      message: "empty array",
    });
  } else {
    res.status(200).send({
      message: "succes",
      data: users,
    });
  }
});
//users id
app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const data = await UserModel.findById(id);
  if (data !== undefined) {
    res.status(200).send(data);
  } else {
    res.status(204).send("data not found!");
  }
});
//users delete
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await UserModel.findByIdAndDelete(id);
  const users = await UserModel.find({});
  if (deletedUser === -1) {
    res.send({
      message: "data not found!",
    });
  } else {
    res.status(200).send({
      message: "data deleted successfully",
      data: users,
    });
  }
});

//post user
app.post("/api/users", async (req, res) => {
  const newUser = new UserModel(req.body);
  await newUser.save();
  res.status(201).send({
    message: "data posted successfully",
    data: newUser,
  });
});

//user patch
app.patch ("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  await UserModel.findByIdAndUpdate(id, req.body);
  const updatedUser = await UserModel.findById(id)
  res.send(updatedUser);

});

//put user
// app.patch("/api/users/:id", (req, res) => {
//   const { id } = req.params;
//   const { username, fullName, profileImg, email, password, isAdmin } = req.body;
//   const data = newsSiteUserData.find((x) => x.id == id);

//   if (username !== undefined) {
//     data.username = username;
//   }
//   if (fullName !== undefined) {
//     data.fullName = fullName;
//   }
//   if (profileImg !== undefined) {
//     data.profileImg = profileImg;
//   }
//   if (email !== undefined) {
//     data.email = email;
//   }
//   if (password != undefined) {
//     data.password = password;
//   }
//   if (isAdmin !== undefined) {
//     data.isAdmin = isAdmin;
//   }

//   res.send({
//     message: "data updated successfully!",
//     data,
//   });
// });

app.listen(PORT, () => {
  console.log(`app listening on PORT:${PORT}`);
});

mongoose.connect(process.env.DB_CONNECTION_KEY.replace('<password>',process.env.DB_PASSWORD))
.then(() => console.log('Connected to Mongo DB!'));
