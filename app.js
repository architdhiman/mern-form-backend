// mongodb+srv://archit:<password>@cluster0.cnhwcoj.mongodb.net/<dbname>
// mongodb+srv://archit:atlasrocks@cluster0.cnhwcoj.mongodb.net/test
const cors =require('cors')
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({path: './config.env'});  //this file is use to protect security data
require('./db/conn')

app.use(express.json())  //json data vscode pad nahi skta toh express mai hota h json ka fn toh uski wajah se padwayenge

app.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:3001"],
      credentials: true,
    })
  );
  
//we linked the router files to make our routes easy
app.use(require ('./router/auth'))

const User = require('./model/userSchema')  

const PORT = process.env.PORT;  //port number bhi hide krlia , dusro ko kyu dikhana

const middleware = (req,res,next) =>{
    console.log('hello from middleware');
    next();
}


app.get('/', (req,res) => {
    res.send('welcome to home page');
})

app.get('/contact',middleware, (req,res) => {
    // User.create({name:archi})
    console.log("contact under middleware");
    res.send('welcome to contact page');
})

app.get('/aboutus', (req,res) => {
    res.send('welcome to about page');
})

app.get('/services', (req,res) => {
    res.send('welcome to services page');
})

app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`);
})
