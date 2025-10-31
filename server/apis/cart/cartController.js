const db = require('../../config/db')
const User = db.User;
const Item=db.Item;
const Cart=db.Cart;
const mail=require('../../utilities/mail')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();
module.exports = {
   addItem,
   removeCartItem,
}
// bvwc tmew eypl nruz
async function removeCartItem(req,res){
    await removeCartItemFun(req)
    .then(data=>res.json(data))
           .catch(err=>res.json(err))     

    
}
async function removeCartItemFun(req){
    
    const formData=req.body || {}
    let validation=''
    if(!formData.productId) validation +="Enter product Id"
    if(!!validation){
        throw({
            status:400,
            success:false,
            message:validation
        })
    }
    try{
    const found= await Cart.findOneAndUpdate({userId:req.decoded._id},
        {
            $pull:{
                items:{productId:formData.productId}
            }
        },{new:true}//shortcut for returning updated document
    ).populate('items.productId')
    
    
    if(!found){
        throw({
            status:404,
            success:false,
            message:"Item Not found"
        })
    }
      return { status: 200, success: true, data: found };
    }
    catch(error){
        throw({
            status:500,
            sucess:false,
            message:"Internal server Error"
     })
}
    
}
    

async function addItem(req,res){
     await addItemFun(req)
        .then(data=>res.json(data))
        .catch(err=>res.json(err))     
}
async function addItemFun(req){
   
    const formData=req.body || {};
    let validation=''
    if(!formData.productId) validation +="Enter product Id"
    if(!formData.quantity) validation +="Enter quantity"
    if(!!validation){
        throw({
            status:422,
            success:false,
            message:validation
    })
}
    const intquant=parseInt(formData.quantity)
    const found=await Item.findById(formData.productId);
    if(!found){
        throw({
            status:404,
            success:false,
            message:"Product Not found"
        })
    }
    let totalcost=0
    let cart=await Cart.findOne({userId:req.decoded._id});
    if(cart){
        const itemIndex=cart.items.findIndex(item=>item.productId.toString()===formData.productId)
        if(itemIndex>-1){
            cart.items[itemIndex].quantity=cart.items[itemIndex].quantity+intquant
           cart.totalPrice+=(intquant*(found.price))
        }else{
            cart.items.push({productId:formData.productId,quantity:intquant,price:parseInt(found.price)})
            cart.totalPrice+=parseInt(found.price)*intquant

        }
    }else{
        totalcost+=(parseInt(found.price)*intquant)
        cart=new Cart({
            userId:req.decoded._id,
            items:[{productId:formData.productId,quantity:intquant,price:parseInt(found.price)}],
            totalPrice:totalcost
        })
    }
    await cart.save();
    await cart.populate('items.productId');
    return ({
        status:200,
        success:true,
        data:cart
    })
}
    
