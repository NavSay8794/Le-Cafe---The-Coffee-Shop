const express = require('express');
const router = express.Router();

const Cart = require('../models/cartModel')
const Products = require('../models/productModel')
const Combos = require('../models/combosModel')

router.get('/products/add-to-cart/:productId' , async (req,res,next)=>{
    try{
        const productId = req.params.productId
        const cart = new Cart(req.session.cart ? req.session.cart : {})
        console.log(cart)
        let product = await Products.findById(productId)
        console.log(product)
        if(product){
            let result = cart.addProduct(product, product.id);
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


router.get('/combos/add-to-cart/:comboId' , async (req,res,next)=>{
    try{
        const comboId = req.params.comboId
        const cart = new Cart(req.session.cart ? req.session.cart : {})
        console.log(cart)
        let comboProduct = await Combos.findById(comboId)
        console.log(comboProduct)
        if(comboProduct){
            let result = cart.add(comboProduct, comboProduct.id);
            req.session.cart= cart
            console.log(req.session.cart)
            console.log(req.session.cart.items[comboId].item)
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