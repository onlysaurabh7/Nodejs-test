const express = require("express");
const path=require("path")
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const userRouter=require("./routes/user")
const db = require("./config/db");
require("dotenv").config();


app.use(bodyParser.json());
app.use(cors());
app.use('/', express.static(path.join(__dirname, 'static')))

// app.set('view engine', 'ejs');
app.use("/api",userRouter)



app.listen(process.env.port,()=>{
    console.log(`Express app is running on port ${process.env.port}`)
})
