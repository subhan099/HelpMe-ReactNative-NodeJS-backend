const user = require('./User/user.controller');
const vendor = require('./Vendor/vendor.controller');
const booking = require('./Booking/index');
// interface
// all controller 
module.exports = {
 user,
 vendor,
 booking
}