const mongoose = require('mongoose')
const { fileUploadToDrive } = require('../auth/authFuntions')

const productSchema = new mongoose.Schema({
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

productSchema.pre('save', async function(next, req) {
    const product = this
    
    const fileId = await fileUploadToDrive(req)
    product.image = fileId

    next()
})

const Product = mongoose.model('Product', productSchema)

module.exports = {
    Product
}