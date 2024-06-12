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
        type: String,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    versionKey: false
});

export default model('transfer', transferSchema);
