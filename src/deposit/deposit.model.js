import { Schema, model, version } from "mongoose";

const depositSchema = Schema({
    date: {
        type: Date,
        required: true
    },
    //No eliminar, esta mousqueHerramienta nos servira para mas tarde
    /*from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },*/
    amount: {
        type: Number,
        required: true
    },
    account: {
        type: Schema.ObjectId,
        ref: 'account',
        required: true
    },
    /*status: {
        type: String,
        enum: ['ACCEPTED', 'PENDING', 'REVERTED'],
        uppercase: true
    }*/
},
{
    versionKey: false
})

export default model('deposit', depositSchema)