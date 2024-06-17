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
<<<<<<< HEAD
    },
    amount: {
        type: Number,
        required: true
=======
>>>>>>> 0af3b617457134efff09409f1a05991477e1f5e6
    }
},
{
    versionKey: false
})

export default model('product', productSchema)