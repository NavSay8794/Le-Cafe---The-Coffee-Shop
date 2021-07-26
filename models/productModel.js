const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product_name: {
        type: 'String',
        required: true
    },
    product_img_url:{
        type:'String',
        required: true
    },
    category:{
        type:'String',
        required: true
    },
    subCategory:{
        type: 'String',
        required: true
    },
    quantity:{
        type: Number,
        default: 0
    },
    base_value: {
        type: Number,
        default: 0
    },
    tax_rate: {
        type: Number,
        min: 0.025
    }
})

module.exports = mongoose.model('Products', productSchema)