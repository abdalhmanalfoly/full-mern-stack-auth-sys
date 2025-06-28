import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
    },
    lastLogin:{
        type:Date,
        default:Date.now,
    },
    isverified:{
        type:Boolean,
        default:false,
    },
    resetPasswordToken: String ,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
},{timestamps:true});

const User = mongoose.model("User", UserSchema);
export default User;