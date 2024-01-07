const express = require("express");
const publishers_router = express.Router();
const publishers_controller = require("../controllers/publishersController");
const PublishersAuthMiddleWare = require ("../middlewares/publishers.middlewares")
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname); 
    },
  });
  
  const upload = multer({ storage: storage });
  
publishers_router.get("/", publishers_controller.getAll);
publishers_router.get("/:id", publishers_controller.getOne);
publishers_router.post("/", upload.single('file'), PublishersAuthMiddleWare, publishers_controller.post);
publishers_router.get("/verify/:token", publishers_controller.verify);
publishers_router.post("/login", publishers_controller.login);
publishers_router.delete("/:id", publishers_controller.delete);
publishers_router.patch("/:id", publishers_controller.edit);

module.exports = publishers_router

