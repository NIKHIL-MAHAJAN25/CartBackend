const mongoose=require('mongoose')
const itemSchema=new mongoose.Schema({
    "name":{type:String},
    "price":{type:Number},
    "deliveryDate":{type:String},
    "inStock":{type:Boolean,default:true}
   
})
module.exports=mongoose.model("Item",itemSchema)