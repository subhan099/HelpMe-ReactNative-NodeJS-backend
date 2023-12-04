const express = require("express");
const {  booking } = require("../Controller");
const router = express.Router();

router.post('/vendor', booking.bookingController);
router.post('/search', booking.bookingSearchController);
router.post('/status', booking.getPaddingRequest);
router.post('/update', booking.updateStatus);
router.post('/active', booking.getActiveRequest);
module.exports = router;