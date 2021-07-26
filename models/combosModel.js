const mongoose = require('mongoose')

const comboSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    products: {
        type: Array,
        required: true,
        default: []
    },
    totalOriginalValue:{
        type: Number,
        default: 0
    },
    quantity:{
        type: Number,
        required: true,
        default: 0
    },
    discount_rate: {
        type: Number,
        min: 0.1
    },
    discounted_Value:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Combos', comboSchema)