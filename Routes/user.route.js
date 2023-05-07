const express = require("express");
const { user } = require("../Controller");
const router = express.Router();

// Register route
router.post('/register' , user.register);

module.exports = router;