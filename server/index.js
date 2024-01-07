const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3032;
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cookieParser());
const cors = require("cors");
app.use(cors());
require("./config/db");
app.use('/uploads', express.static('uploads'))
const router = require("./routes");
app.use("/api/users", router.users);
app.use("/api/publishers", router.publishers);  
const bcrypt = require("bcrypt");

app.listen(PORT, () => {
  console.log(`app listening on PORT:${PORT}`);
});
