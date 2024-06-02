import { Schema, model, version } from "mongoose";

const billSchema = Schema({
    date: {
        type: Date,
        required: true
    },
    totalprice: {
        type: Number,
        required: true
    },
    buys: {
        type: Schema.ObjectId,
        ref: 'buys',
        required: true
    }
},
{
    versionKey: false
})

export default model('bill', billSchema)