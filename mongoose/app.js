
// const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
// const bcryptjs = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const app = express();


// Configure ENV File & Require Connection File
// dotenv.config({path : './config.env'});
require('./db/conn');
// const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(cors());


// Require Model
const Users = require('./models/userSchema');

app.set('view engine', 'ejs');

app.post('/register', async (req, res)=>{
    try {
        // Get body or Data
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        const createUser = new Users({
            username : username,
            email : email,
            password : password
        });

        const created = await createUser.save();
        console.log(created);
        res.status(200).send("Registered");
        // res.render("secret");


    } catch (error) {
        res.status(400).send(error)
    }

    // res.render("/Frontend/register")
})

//Login 
app.post('/login', async (req, res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        //Find User if Exist
        const user = await Users.findOne({email:email});
        if(user){
            //verify password
            // const isMatch = await bcryptjs.compare(password, user.password);
            var isMatch = false;
            if(password==user.password)
            {
                isMatch = true;
            }

            if(isMatch){
                // generate Token Which is Define in User Schema
                // const token = await user.generateToken();
                // res.cookie("jwt",token,{
                //     expires : new Date(Date.now() + 86400000),
                //     httpOnly : true
                // })
                res.status(200).send("LoggedIn")
                // res.render("secret");
            }
            else{
                res.status(400).send("Invalid Credentials");
            }
        }
        else{
            res.status(400).send("Invalid Credentials");
        }
    }catch(error){
        res.status(400).send(error);
    }
})

// app.get("/fatch",(req,res)=>{
//     Users.find({})
//     .then((items)=>res.json(items))
//     .catch((err)=>console.log(err));

// });


// app.get('/',(req,res)=> {
//     res.render("home")
// })

// app.get('/register',(req,res)=> {
//     res.render("register")
// })

// app.get('/login',(req,res)=> {
//     res.render("login")
// })

// app.get('/secret',(req,res)=> {
//     res.render("secret")
// })

// app.get('/logout',(req, res) =>{
//     // req.logout();
//     res.render("/");
// });


// app.get("/logout", function (req, res) {
//     req.logout();
//     res.redirect("/");
// });
 
// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) return next();
//     res.redirect("/login");
// }

// app.get("/delete",(req,res) => {
//     Users.findByIdAndDelete({_id: '63349aabe6b944e21ab4abfd'},()=>{
//        console.log("deleted")
//     })
// })


// app.put("/update/:id",async(req,res) => {
//     let user = await Users.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//       });
//       return res.status(200).send({message:"updated"})
// })

app.listen(4000, ()=>{
    console.log("Server is Listening")
})
