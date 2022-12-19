const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MongoURI)
        console.log("database is connected ...")
    } catch (error) {
        console.log(`can not connect to database ${error}`)
    }
}

module.exports = connectDB