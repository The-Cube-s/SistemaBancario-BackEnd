import mongoose, { Types } from 'mongoose';
const { Schema, model } = mongoose;

const transactionSchema = new Schema({
    
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        
    },
    deposit: {
        type: Schema.ObjectId,
        ref: 'deposit',
        
    },
    transfer: {
        type: Schema.ObjectId,
        ref: 'transfer',        
    },
    

}, {
    versionKey: false
});

export default model('transaction', transactionSchema);
