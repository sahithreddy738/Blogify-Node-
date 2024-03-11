const {Schema,model}=require("mongoose");

const userSchema=new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    },
    profileImage:{
        type:String,
        default:"/images/default.png"
    }
},{timestamps:true})

const User=model("user",userSchema);

module.exports=User;