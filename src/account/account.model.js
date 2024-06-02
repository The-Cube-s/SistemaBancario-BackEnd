import { Schema, model } from "mongoose";

const accountSchema = Schema({
    noaccount: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    typeofaccount: {
        type: String,
        uppercase: true,
        enum: ['AHORRO', 'MONETARIA'],
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    }
},
{
    versionKey: false
})

export default model('account', accountSchema)