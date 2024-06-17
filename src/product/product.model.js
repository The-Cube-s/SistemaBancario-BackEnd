import { Schema, model } from "mongoose"

const productSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    imagesProduct: {
        type: [String],
        required: true    
    }
},
{
    versionKey: false
})

export default model('product', productSchema)