const mongoose=require('mongoose');
const userSchema= new mongoose.Schema({
    "autoId":{type:Number,default:0},
    "name":{type:String,default:''},
    "email":{type:String,default:''},
    "phoneNumber":{type:Number,default:''},
    "password":{type:String,default:''},
    "isDeleted":{type:Boolean,default:false},
    "status":{type:Boolean,default:true},
},{
    timestamps:true
})
module.exports=mongoose.model("User",userSchema)
