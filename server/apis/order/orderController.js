const db = require('../../config/db')
const User = db.User;
const Order=db.Order;
const Item=db.Item;
const Cart=db.Cart;
const mail=require('../../utilities/mail')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config();
module.exports = {
  checkout
}
// bvwc tmew eypl nruz
async function checkout(req,res){
    await checkoutFun(req)
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
}
async function checkoutFun(req){
    const formData=req.body || {}
    if(!formData.cartId){
        throw({
            status:404,
            success:false,
            message:"Enter cart Id"
        })
    }
    const cart=await Cart.findById(formData.cartId).populate('items.productId')
    if(!cart){
        throw({
            status:404,
            success:false,
            message:"Cart does not exist "
        })
    }
    if(cart.items.length==0){
        throw({
            status:401,
            success:true,
            message:"Error:Empty Cart"
        })
    }
    const order=new Order({
        userId:req.decoded._id,
        items:cart.items.map(item=>({
             productId: item.productId._id,
            name: item.productId.name, 
            price: item.price,       
            quantity: item.quantity
        })),
        totalCost:cart.totalPrice,
        status:'confirmed'
    });
    const savedOrder= await order.save();
    const cartfinal=await Cart.findOneAndUpdate(
        {userId:req.decoded._id},
        {$set:{items:[]}},
        {new:true}
    )
    if(savedOrder){
    await mail.sendOrderConfirm({userEmail:savedUser.email})
       return({
            status:200,
            success:true,
            message:"Congrats your order is placed"
        })
    }



}