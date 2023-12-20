const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
require('dotenv').config();
const newsSiteUserData = require("./users.js")
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3031;


// get all users
app.get("/api/users", (req, res) => {
  if (newsSiteUserData.length == 0) {
    res.status(204).send({
      message: "empty array",
    });
  } else {
    res.status(200).send({
      message: "succes",
      data: newsSiteUserData,
    });
  }
});
//users id
app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const data = newsSiteUserData.find((x) => x.id == id);
  if (data !== undefined) {
    res.status(200).send(data);
  } else {
    res.status(204).send("data not found!");
  }
});
//users delete
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const idx = newsSiteUserData.findIndex((x) => x.id == id);
  if (idx === -1) {
    res.send({
      message: "data not found!",
    });
  } else {
    res.status(200).send({
      message: "data deleted successfully",
      data: newsSiteUserData.splice(idx, 1),
    });
  }
});

//post user
app.post("/api/users", (req, res) => {
  const { username, fullName, profileImg, email, password, isAdmin } = req.body;
  const newUser = {
    id: crypto.randomUUID(),
    username,
    fullName,
    profileImg,
    email,
    password,
    isAdmin,
  };
  newsSiteUserData.push(newUser);
  res.status(201).send({
    message: "data posted successfully",
    data: newUser,
  });
});


//user put
app.put('/api/users/:id',(req,res)=>{
    const{id}= req.params;
    const {username, fullName, profileImg, email, password, isAdmin} = req.body;
    const data = newsSiteUserData.find((x)=>x.id==id);
    const updatedData = {
        id: data.id
    };
    if (username!==undefined) {
        updatedData.username = username;
    }
    if (fullName!==undefined) {
        updatedData.fulfullName =fullName
    }
    if (profileImg!==undefined) {
        updatedData.profileImg = profileImg;
    }
    if (email!==undefined) {password
        updatedData.email = email;
    }
    if (password!=undefined) {
        updatedData.password = password;
    }
    if (isAdmin!==undefined) {
        updatedData.isAdmin = isAdmin;
    }

    const idx = newsSiteUserData.findIndex((x)=>x.id==id);
    newsSiteUserData[idx] = updatedData;

    res.send({
        message:'data updated successfully!',
        data: updatedData
    })
})



//patch user
app.patch('/api/users/:id',(req,res)=>{
    const{id}= req.params;
    const {username, fullName, profileImg, email, password, isAdmin} = req.body;
    const data = newsSiteUserData.find((x)=>x.id==id);

    if (username!==undefined) {
        data.username = username;
    }
    if (fullName!==undefined) {
        data.fullName =fullName
    }
    if (profileImg!==undefined) {
        data.profileImg = profileImg;
    }
    if (email!==undefined) {
        data.email = email;
    }
    if (password!=undefined) {
        data.password = password;
    }
    if (isAdmin!==undefined) {
        data.isAdmin = isAdmin;
    }
    
    res.send({
        message: 'data updated successfully!',
        data
    })
})

app.listen(PORT, () => {
  console.log(`app listening on PORT:${PORT}`);
});
