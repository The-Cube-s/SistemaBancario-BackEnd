import { Schema, model, version } from "mongoose";


const transferSchema = Schema({
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    userTarget: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    //necesitamos el account del usuario
    account: {
        type: Schema.ObjectId,
        ref: 'account',
        required: true
    }
},
{
    versionKey: false
})

export default model('transfer', transferSchema)