const UserModel = require("../models/users.model");
const bcrypt = require('bcrypt');
const users_controller = {
  getAll: async (req, res) => {
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
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const data = await UserModel.findById(id);
    if (data !== undefined) {
      res.status(200).send(data);
    } else {
      res.status(204).send("data not found!");
    }
  },
  post: async (req, res) => {
    // console.log("newUser", newUser);
    const password = req.body.password
    const salt =  await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,parseInt(salt))
    req.body.password = hashedPassword
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(201).send({
      message: "data posted successfully",
      data: newUser,
    });
  },
  delete: async (req, res) => {
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
  },
  edit: async (req, res) => {
    const { id } = req.params;
    await UserModel.findByIdAndUpdate(id, req.body);
    const updatedUser = await UserModel.findById(id);
    res.send(updatedUser);
  },
  // login: async (req, res) => {
  //     const {email,password} = req.body
  //     const user = await UserModel.findOne({email: email})

  //     if (!user) {
  //       res.send({message:"invalid credentials"})
  //     }
  //     if (user.isVe) {
        
  //     }
  //   },
};

module.exports = users_controller