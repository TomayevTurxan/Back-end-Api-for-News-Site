const express = require("express");
const users_router = express.Router();
const users_controller = require("../controllers/usersController");
const UsersAuthMiddleWare = require ("../middlewares/users.middlewares")
users_router.get("/", users_controller.getAll);
users_router.get("/:id", users_controller.getOne);
users_router.post("/",UsersAuthMiddleWare, users_controller.post);
users_router.delete("/:id", users_controller.delete);
users_router.patch("/:id", users_controller.edit);


module.exports = users_router

