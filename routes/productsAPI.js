const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// adding products model
const Products = require('../models/productModel')

// adding routing to products page
router.get('/products/:filter', async (req, res, next) => {
    try {
        const category = req.params.filter
        console.log(category)
        if (category === 'menu') {
            let products = await Products.find({})
            res.status(200).json({
                message: 'Product Retrieved Successfully',
                products
            })
        }else{
            updatedCategory = category.charAt(0).toUpperCase() + category.slice(1);
            let products = await Products.find({category: updatedCategory})
            res.status(200).json({
                message: 'Product Retrieved Successfully',
                products
            })
        }
    }catch (err) {
        res.status(500).json({
            message: 'Some Error Occurred',
            err
        })
    }
})


router.post('/admin/products', async (req, res, next) => {
    console.log(req.body)
    try {
        const product = await Products.find({ product_name: req.body.product_name })
        console.log(product)
        if (product.length) {
            res.status(200).json({
                message: 'check Later'
            })
        } else {
            const tax_rate = req.body.tax_rate / 100
            const newProduct = new Products({
                _id: mongoose.Types.ObjectId(),
                product_name: req.body.product_name,
                product_img_url: req.body.imgUrl,
                category: req.body.category,
                subCategory: req.body.type,
                quantity: req.body.quantity,
                base_value: req.body.value,
                tax_rate: tax_rate
            })
            let result = await newProduct.save()
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
        }
    } catch (err) {
        res.status(500).json({
            message: 'Some Error Occurred',
            err
        })
    }
})

module.exports = router