import mongoose from 'mongoose';
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
    userTarget: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    }
}, {
    versionKey: false
});

export default model('Transfer', transferSchema);
