const mongoose = require("mongoose");
const bookingSchema = mongoose.Schema({
  customer_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  vendor_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
  status: {
    type: String,
    enum: ["active", "completed", "pending" , "reject"],
    default: "pending",
  },
  issues : [{
    id : Number,
    issue : String
  }],
  vehicleType :  {
    type : String
  },
  location : {
    lat : {
      type : Number,
      default : null,
    },
    lng : {
      type : Number,
      default : null,
    }
  },
  createdAt: {
    type: Date,
    default: Date.now 
  },
  updatedAt: {
      type: Date,
      default: Date.now
    }
});

bookingSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const bookingModel = mongoose.model("booking", bookingSchema);

module.exports = bookingModel;
