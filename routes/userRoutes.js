const express = require('express');
const router = express.Router();
const controllers = require("../controllers/userControllers");
const User = require('../models/User');

//test routing
router.get('/hello', (req, res)=>{
    res.send('hello routing..')
})
//add user /method post/params Body
//path :http://localhost:7001/api/newUser
router.post('/newUser', controllers.postUser )

//get users /method get
//path : http://localhost:7001/api/users
router.get("/users",async(req,res)=>{
    try {
        const result = await User.find()
        res.status(200).send({response:result , message:"geting users seccessfully"})
    } catch (error) {
        res.send({message:"can not get users"})
    }
})

//get One user /method get
//path :http://localhost:7001/api/users/:id
router.get("/users/:id",async(req,res)=>{
    try {
        const result = await User.findOne({_id:req.params.id})
        if(result){
            res.status(200).send({response:result , message:"geting user by ID seccessfully"})
        }else{
            res.status(400).send({message:"there is no user with this id"})
        }
    } catch (error) {
        res.send({message:"can not get user"})
    }
})

//Delete  user /method delete
//path :http://localhost:7001/api/delete/:id
router.delete("/delete/:id",async(req,res)=>{
    try {
        const result = await User.deleteOne({_id:req.params.id})
        if(result){
            res.status(200).send({response:result , message:"delete user by ID seccessfully"})
        }else{
            res.status(400).send({message:"there is no user with this id"})
        }

    } catch (error) {
        res.send({message:"can not delete user"})
    }
})

//Update One user /method put
//path :http://localhost:7001/api/user/:id
router.put("/user/:id",async(req,res)=>{
    try {
        const result = await User.updateOne({_id:req.params.id},{$set:{...req.body}})
        if(result){
            const newResult = await User.findOne({_id:req.params.id})
            res.status(200).send({response:newResult , message:"update user by ID seccessfully"})
        }else{
            res.status(400).send({message:"there is no user with this id"})
        }
    } catch (error) {
        console.log(error)
        res.send({message:"can not update user"})
    }
})


module.exports = router
