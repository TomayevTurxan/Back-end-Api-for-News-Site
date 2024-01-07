const PublisherModel = require("../models/publishers.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const publishers_controller = {
  getAll: async (req, res) => {
    const publishers = await PublisherModel.find({});
    if (publishers.length == 0) {
      res.status(204).send({
        message: "empty array",
      });
    } else {
      res.status(200).send({
        message: "succes",
        data: publishers,
      });
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const data = await PublisherModel.findById(id);
    if (data !== undefined) {
      res.status(200).send(data);
    } else {
      res.status(204).send("data not found!");
    }
  },
  post: async (req, res) => {
    const  {publisherName,fullName,password,email,isVerify} = req.body
    const file = req.file
    // password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, parseInt(salt));
    // req.body.password = hashedPassword;
    const updatedPublisher = {
      publisherName: publisherName,
      fullName:  fullName,
      email:email,
      password:hashedPassword,
      isVerify: isVerify,
      file: file 
    }
    const newPublisher = new PublisherModel(updatedPublisher)
    //token
    const token = jwt.sign({ email: req.body.email }, "SECRET_KEY", {
      expiresIn: "10h",
    });
    res.cookie("token", token, { httpOnly: true, secure: true });
    // console.log("token",token)
    //send email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: "tu7hfn0xh@code.edu.az",
        pass: "ddlf wauk uvzr mxfo",
      },
    });

    const mailData = {
      from: "tu7hfn0xh@code.edu.az",
      to: req.body.email,
      subject: "Verify your Account news project",
      text: "That was easy!",
      html: `Click here to verify your account: http://localhost:8080/api/publishers/verify/${token}`,
    };
 
    try {
      await transporter.sendMail(mailData);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).send({
        message: "Error sending email",
        error: error.message,
      });
    }
    console.log("File:", req.file); // Check if Multer properly parsed the file
    console.log("Body:", req.body); // Check if form data is received correctly
    



    await newPublisher.save();
    res.status(201).send({
      message: "data posted successfully",
      data: newPublisher,
    });
  },

  verify: async (req, res) => {
    const { token } = req.params;
    jwt.verify(token, "SECRET_KEY", async(err, decoded) => {
      if (err) {
        console.error("Error verifying token:", err);
          return res.send({
            message: 'invalid token',
            error: err.message,
          });
      }
      else{
        const foundPublisher = await PublisherModel.findOne({email: decoded.email});
        console.log(foundPublisher)
        if (!foundPublisher) {
          res.send({
            message: 'artist not found with this email!'
          })
        }
        else{
          await PublisherModel.findByIdAndUpdate(foundPublisher._id, {isVerify: true});
          res.redirect('http://localhost:5173/Login');
        }
      }
    })
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const publisherDeleted = await PublisherModel.findByIdAndDelete(id);
    const publishers = await PublisherModel.find({});
    if (publisherDeleted === -1) {
      res.send({
        message: "data not found!",
      });
    } else {
      res.status(200).send({
        message: "data deleted successfully",
        data: publishers,
      });
    }
  },
  edit: async (req, res) => {
    const { id } = req.params;
    await PublisherModel.findByIdAndUpdate(id, req.body);
    const PublisherUpdate = await PublisherModel.findById(id);
    res.send(PublisherUpdate);
  },
  login: async (req, res) => {
    try {
      const { publisherName, password } = req.body;
      const publisher = await PublisherModel.findOne({ publisherName });
      if (
        !publisher ||
        !publisher.isVerify ||
        !(await bcrypt.compare(password, publisher.password))
      ) {
        console.error(
          "Login failed: Invalid credentials or unverified account"
        );
        return res.status(401).send({
          status: 401,
          message: "Invalid credentials or unverified account!",
        });
      } else {
        console.log("Login successful");
        //token generate
        console.log(publisher);
        const token = jwt.sign(
          { publisherName, _id: publisher._id },
          process.env.SECRET_KEY,
          {
            expiresIn: "7d",
          }
        );
        res.send({ status: 200, message: "welcome!", token: token });
      }
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).send({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },
};

module.exports = publishers_controller;
