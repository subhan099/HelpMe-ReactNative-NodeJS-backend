const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now 
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the `updatedAt` field with the current date and time before saving
UserSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});


const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;