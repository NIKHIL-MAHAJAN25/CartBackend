const mongoose=require('mongoose')
const orderSchema=new mongoose.Schema({
    "userId":{type:mongoose.Schema.Types.ObjectId,ref:'User'},
   "items":[{itemId:{type:mongoose.Schema.Types.ObjectId,ref:'Item'},
    "name":{type:String,required:true},
    "price":{type:Number},
    "quantity":{type:Number},

}],
   "totalCost":{type:Number},
   "status":{type:String,enum:['confirmed','pending','cancelled']}
   
   
},
{
    timestamps:true
})
module.exports=mongoose.model("Order",orderSchema)