import { Schema, model, version } from "mongoose";

const depositSchema = Schema({
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    account: {
        type: Schema.ObjectId,
        ref: 'account',
        required: true
    }
},
{
    versionKey: false
})

export default model('deposit', depositSchema)