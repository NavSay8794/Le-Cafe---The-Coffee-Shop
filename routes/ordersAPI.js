const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
//adding order model
const Orders = require('../models/ordersModel')

//adding helpers
const dateMapper = require('../helpers/dateMapper')
const cartMapper = require('../helpers/cartMapper')

router.get('/myOrders' , async (req,res,next)=>{
    try{
        res.status(200).json({
            message:'Orders Working'
        })
    }catch(err){
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})


router.post('/order' , async (req,res,next)=>{
    try{
        let orderTimeline = await dateMapper.dateMapper()
        const prevOrders = await Orders.find({});
        let orderNum = 0
        if(prevOrders.length === 0){
            orderNum = 0001
        }else{
            orderNum = Number(prevOrders[prevOrders.length-1].orderNumber) +1
        }
        const cartDetails = req.session.cart
        const mappedCart = await cartMapper.cartMapper(cartDetails)
        console.log(mappedCart)
        
        const newOrder = await new Orders({
            _id: mongoose.Types.ObjectId(),
            orderNumber: orderNum,
            orderDate: orderTimeline.currentDate,
            orderValue: mappedCart.totalValue,
            items: mappedCart.items,
            orderTime:orderTimeline.orderTime           
        })
        console.log(newOrder)
        let result = await newOrder.save()
        res.status(201).json({
            message: 'Order Created Successfully',
            result
        })

    }catch(err){
        res.status(500).json({
            message: 'Something Went Wrong',
            err
        })
    }
})

module.exports = router