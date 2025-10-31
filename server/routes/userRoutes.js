const router = require('express').Router();

const UserController = require('../apis/user/userController')
const ItemController=require('../apis/item/itemController')
const cartController=require('../apis/cart/cartController');
const itemModel = require('../apis/item/itemModel');
const orderController=require('../apis/order/orderController')
router.post('/register',UserController.registerUser)
router.post('/login',UserController.loginUser)
router.post('/add-item',ItemController.addItem) 
router.use(require('../middleware/tokenChecker'))
router.post('/fetch',ItemController.fetchItem)
router.post('/add-cart',cartController.addItem)
router.post('/remove-item',cartController.removeCartItem)
router.post('/checkout',orderController.checkout)







router.all(/(.*)/, (req, res)=>{
    res.send({
        status: 404, 
        success: false, 
        message:"No such API!!"
    })
})

module.exports = router;