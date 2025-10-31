const mongoose=require('mongoose')
const dotenv = require('dotenv')
dotenv.config();
const URI=process.env.URI;
async function connect(){
    try{
        await mongoose.connect(URI);
        console.log("Connected with atlas");
    }catch(err){
        console.log("Error:",err);
    }
}
module.exports={
    Cart : require('../apis/cart/cartModel'),
    Item : require('../apis/item/itemModel'),
    Order: require('../apis/order/orderModel'),
    User : require('../apis/user/userModel')
}
connect();