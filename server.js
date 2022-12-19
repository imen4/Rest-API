const express = require('express');
require('dotenv').config({path: "./config/.env"});
const connectDB = require('./config/connectDB');
const userRouter = require('./routes/userRoutes')

const app = express();

connectDB()

//middleware
app.use(express.json())
//create route
app.use('/api', userRouter)

const PORT = process.env.PORT || 8000 

app.listen(PORT,(err)=>{
    err? console.log(err): console.log(`server is running on port ${PORT}`)
})