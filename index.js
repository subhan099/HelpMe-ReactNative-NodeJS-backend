const express  = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config();
const userRoute = require('./Routes/user.route');
const vendorRoute = require('./Routes/vendor.route');
const bookingRoute = require('./Routes/booking.route');
// connect database
require('./DataBase/db.connect');
const PORT = process.env.PORT || 3001
// middleware
// Set CORS headers
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
// api Routes
app.use('/user' , userRoute);
app.use('/vendor' , vendorRoute);
app.use('/booking', bookingRoute);
app.get('/', (req, res) => {
    console.log("req");
    return res.json({success : "hello"})
})

// START SERVER 
app.listen(PORT, () => {
    console.log(`Server URL == http://localhost:${PORT}`);
})