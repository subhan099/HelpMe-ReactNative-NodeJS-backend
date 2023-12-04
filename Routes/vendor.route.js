const express = require("express");
const { vendor } = require("../Controller");
const router = express.Router();

// Register route
//router.post('/register' , user.userRegister);
router.post('/register' , vendor.vendorRegister);
router.post('/signIn' , vendor.vendorSignIn);


module.exports = router;