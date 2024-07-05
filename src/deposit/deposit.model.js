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
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        
    }
},
{
    versionKey: false
})

export default model('deposit', depositSchema)