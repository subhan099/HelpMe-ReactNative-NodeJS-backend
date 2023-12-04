const mongoose = require('mongoose');
const VendorSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true ,
    },
    lastName : {
        type : String,
        required : true ,
    },
    email : {
        type : String,
        required : true ,
        unique : true 
    },
    password : {
        type : String,
        required : true ,
    },
    isVerified:{
        type:Boolean,
        enum:[true,false],
        default:false
    },
    otp : {
       type : String,   
    },
    lat : {
        type : Number,
        default : null
    },
    lng : {
        type : Number ,
        default : null
    },
    altitude : {
        type : Number ,
        default : null
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

VendorSchema.index({  lat: '2dsphere', lng: '2dsphere' } );
// Update the `updatedAt` field with the current date and time before saving
VendorSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});


const VendorModel = mongoose.model("Vendor", VendorSchema);

module.exports = VendorModel;