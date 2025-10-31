const db = require('../../config/db')
const User = db.User;
const Item=db.Item
const mail=require('../../utilities/mail')

const dotenv = require('dotenv')
dotenv.config();
module.exports = {
   addItem,
   fetchItem
}
// bvwc tmew eypl nruz
async function fetchItem(req,res){
    await fetchItemFun(req)
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
}
async function fetchItemFun(req){
    try{
        const fetched=await Item.find({inStock:true})
        return({
            status:200,
            sucess:true,
            message:"Fetched All the items",
            data:fetched
        })
        
    }catch(error){
        throw({
            status:404,
            success:false,
            message:error
        })
    }
}
async function addItem(req,res){
    await addItemFun(req)
        .then(data=>res.json(data))
        .catch(err=>res.json(err))     
}
async function addItemFun(req){
    try{
        const formData=req.body || {}
        let validation=''
        if(!formData.name) validation +="name is required"
        if(!formData.price) validation +="price is required"
        if(!formData.deliveryDate) validation +="Delivery date is required"
        if(!!validation){
           throw({
                status:422,
                success:false,
                message:validation
            })
        }
        const found=await Item.findOne({name:formData.name})
        if(found){
            throw({
                status:404,
                success:false,
                message:"Item already exists"
            })
        }
       try{
                const newItem=new Item();
                newItem.name=formData.name,
                newItem.price=formData.price,
                newItem.deliveryDate=formData.deliveryDate
                await newItem.save();
                  return({
                        status:200,
                        success:true,
                        message:"Item added successfully",
                        data:newItem,
                        
                    })
                }
                catch(err){
                    throw({
                        status:401,
                        success:false,
                        message:"Item saving error"+err
                    })
                }
            
        

    }catch(err){
            throw err;
    }
}
