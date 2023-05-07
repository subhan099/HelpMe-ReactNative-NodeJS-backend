const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose.connect(process.env.MongoDBCloud).then(() => {
    console.log("DataBase Connect Successfully !");
}).catch(error => {
    console.log("Database Error ==> ", error);
})