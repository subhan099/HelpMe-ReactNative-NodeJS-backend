const express  = require("express");
const cors  = require("cors");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config();
const userRoute = require('./Routes/user.route');
// connect database
require('./DataBase/db.connect');
const PORT = process.env.PORT || 3000;
// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/user' , userRoute);

// api Routes







// START SERVER 
app.listen(PORT, () => {
    console.log(`Server URL == http://localhost:${PORT}`);
})