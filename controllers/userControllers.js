const User = require("../models/User");

exports.postUser = async(req, res)=>{
    try {
        //create new user with the model user
        const newUser = new User (req.body)
        // test is user has name
        if(!req.body.name){
            res.status(400).send({message:"name is required check again"})
            return;
        }
        // test is user has email
        if (!req.body.email) {
            res.status(400).send({message:"email is required check again"})
            return;
        }
        //test 2  : if the email already exist = email should be unique
        const user = await User.findOne({email: req.body.email})
        if(user){
            res.status(400).send({message:"user already exist email, should be unique"})
            return;
        }
         //save Conact
         const response = await newUser.save();
         res.status(200).send({response:response , message:"user is saved"})
    } catch (error) {
        res.status(500).send({message:"can not save it"})
        console.log(error)
    }
}

