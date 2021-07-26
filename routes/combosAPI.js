const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// adding products model
const Combos = require('../models/combosModel')

// adding routing to products page
router.get('/combos', async (req, res, next) => {
    try {
        let comboProducts = await Combos.find({})
        res.status(200).json({
            message: 'Combos Retrieved Successfully',
            comboProducts
        })
    } catch (err) {
        res.status(500).json({
            message: 'Some Error Occurred',
            err
        })
    }
})


router.post('/admin/combos', async (req, res, next) => {
    console.log(req.body)
    try {
        // const comboProduct = await Combos.find({ product_name: req.body.product_name })
        // console.log(product)
        const discount_rate = req.body.discount_rate / 100
        const discountedVal = req.body.totalOVal - (req.body.totalOVal* discount_rate)
        const newComboProduct = new Combos({
            _id: mongoose.Types.ObjectId(),
            products: req.body.products,
            totalOriginalValue: req.body.totalOVal,
            quantity: req.body.quantity,
            discount_rate: discount_rate,
            discounted_Value: discountedVal
        })
        let result = await newComboProduct.save()
        if (result) {
            res.status(201).json({
                message: 'Product Saved Successfully',
                result
            })
        } else {
            res.status(401).json({
                message: err
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Some Error Occurred',
            err
        })
    }
})

module.exports = router