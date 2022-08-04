const express = require('express');
const router = express.Router();
require('../db/conn');
const bcrypt = require('bcrypt');
const User = require('../model/userSchema');

router.get('/', (req,res) => {  //jab homepage ki location dalenge toh uspe res.send mai jo likha hoga wo dikhega
    res.send('welcome from the backend auth.js')
})

router.post('/register', async (req,res) => {

    const {name,gender,email,age,joining,password} = req.body;

    if(!name ||  !gender || !email || !age || !joining || !password )
    {
        return res.status(422).json({error: ("please fill the form completely")});
    }

    try{
    const userExist = await User.findOne({email: email})
    
        if(userExist)
        {
            return res.status(422).json({error: "email already exist"});   
        }else{
            const user = new User({name,gender,email,age,joining,password});

        await user.save();  //newly data save hojyega isse
       
        res.status(201).json({message : "user registerred successfuly through aysnc await"})
        }
        
        
    } catch(err){
    console.log(err);
    }
});


// login route post
router.post('/signin', async (req,res) =>{
    try{
        const{email,password} = req.body;
    if(!email || !password)
    {
        return res.status(400).json({error :"details incomplete"});
    }
    
    const userLogin = await User.findOne({email: email})
    // console.log(userLogin);
        
    if(userLogin)
    {
        const isMatch = await bcrypt.compare(password, userLogin.password);

        if(!isMatch){
        res.status(400).json({error: "invalid credentials" })
        }else{
        res.json({message : "signin successfull welcome back user"});
    }}
    else{
        res.status(400).json({error: "invalid credentials"});
    }}
    catch(err){
        console.log(err);
    }
})
module.exports = router;



// promises wale tareeke ke saath
// router.post('/register', (req,res) =>{  //post mtlb VS code ke console pe post krna h jo location dali hai register page pe postman se connect krke
//     // res.send(req.body) // isse yuhi postman pe print krwane ke lie use kia h
//     // console.log(req.body);  //response mai uss request ki sari body milegi

//     const {name,email,age,work,password,cpassword} = req.body;
//     // console.log(name);
//     // console.log(email);

//     if(!name || !email || !age || !work || !password || !cpassword)
//     {
//         return res.status(422).json({error: ("please fill the form completely")});
//     }

//     User.findOne({email:email})
//     .then((userExist) =>{
//       if(userExist)  
//       return res.status(422).json({error: "email already exist"});
    
    
//     const user = new User({name,email,age,work,password,cpassword})
//     user.save().then(() =>{
//         res.status(201).json({message: "user registered success"});
//     }).catch((err) => res.status(500).json({error: "Failed to register"}));

//     }).catch(err => {console.log(err) })
    
// })

// router.post('/signin', (req,res) =>{
//     console.log(req.body);
//     res.json({message : "awesome"});
// })
// module.exports = router
