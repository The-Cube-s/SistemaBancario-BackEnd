import { Schema, model } from "mongoose";

const buysSchema = Schema({
    amount: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    product: {
        type: Schema.ObjectId,
        ref: 'product',
        required: true
    }
},
{
    versionKey: false
})

export default model('buys', buysSchema)