import { Schema, model } from "mongoose"

const accountSchema = Schema({
    noaccount: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
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