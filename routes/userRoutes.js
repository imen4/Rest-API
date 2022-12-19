const express = require('express');
const router = express.Router();
const controllers = require("../controllers/userControllers");
const User = require('../models/User');

//POST :  ADD A NEW USER TO THE DATABASE 
//path :http://localhost:7001/api/newUser
router.post('/newUser', controllers.postUser )

//GET :  RETURN ALL USERS 
//path : http://localhost:7001/api/users
router.get("/users",async(req,res)=>{
    try {
        const result = await User.find()
        res.status(200).send({response:result , message:"geting users seccessfully"})
    } catch (error) {
        res.send({message:"can not get users"})
    }
})

//PUT : EDIT A USER BY ID 
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

//DELETE : REMOVE A USER BY ID 
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


module.exports = router
