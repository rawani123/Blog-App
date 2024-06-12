import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    blogs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Blog"
        }
    ]
},{timestamps:true});


const User = mongoose.model("User",userSchema);

export default User;