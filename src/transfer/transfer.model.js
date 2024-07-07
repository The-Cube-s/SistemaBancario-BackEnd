import mongoose, { Types } from 'mongoose';
const { Schema, model } = mongoose;

const transferSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    //
    userTarget: {
        type: Schema.ObjectId,
        ref: 'account',
        required: true
    },
    //mandar el id del token que esta loggeado
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    versionKey: false
});

export default model('transfer', transferSchema);
