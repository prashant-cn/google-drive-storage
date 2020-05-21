const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
    name: {
        type: String,
        required: true,
        minlength: [3, 'Product Name Must Contain 3 Letters'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        default: 0.00
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = {
    Product
}