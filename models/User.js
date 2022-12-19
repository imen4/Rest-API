const mongoose = require('mongoose');
const {Schema, model} = mongoose

const userSchema = new Schema ({
    name: {type:String, required: true},
    email: {type:String, required:true},
    phone: {type:String}

})

module.exports = User = model("users",userSchema)
