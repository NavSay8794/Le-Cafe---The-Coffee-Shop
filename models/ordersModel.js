const mongoose = require('mongoose')

const ordersSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    orderNumber:{
        type: Number,
        required: true,
        default: 0001
    },
    orderDate:{
        type: String,
        required: true
    },
    orderValue:{
        type: Number,
        required: true
    },
    items:{
        type: Array,
        default: []
    },
    orderTime:{
        type: 'String',
        required: true
    }
})


module.exports = mongoose.model('Orders', ordersSchema)