const express = require('express');
const router = express.Router();

const Cart = require('../models/cartModel')
const Products = require('../models/productModel')

router.get('/add-to-cart/:productId' , async (req,res,next)=>{
    try{
        const productId = req.params.productId
        const cart = new Cart(req.session.cart ? req.session.cart : {})
        console.log(cart)
        let product = await Products.findById(productId)
        console.log(product)
        if(product){
            let result = cart.add(product, product.id);
            req.session.cart= cart
            console.log(req.session.cart)
            console.log(req.session.cart.items[productId].item)
            res.status(200).json({
                message: 'Product Added to the cart Successfully'
            })
        }
    }catch(err){
        res.status(500).json({
            message:'Something Went Wrong',
            err
        })
    }
})


router.get('/cart' , async (req,res,next)=>{
    try{
        const cartDetails =await req.session.cart
        res.status(200).json({
            cartDetails
        })
    }catch(err){
        res.status(500).json({
            message:'Something Weng Wrong'
        })
    }
})
module.exports = router