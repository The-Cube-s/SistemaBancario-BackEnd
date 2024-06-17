<<<<<<< HEAD
import mongoose, { Types } from 'mongoose';
=======
import mongoose from 'mongoose';
>>>>>>> 0af3b617457134efff09409f1a05991477e1f5e6
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
<<<<<<< HEAD
        type: Schema.ObjectId,
        ref: 'account',
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
=======
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
>>>>>>> 0af3b617457134efff09409f1a05991477e1f5e6
        required: true
    }
}, {
    versionKey: false
});

<<<<<<< HEAD
export default model('transfer', transferSchema);
=======
export default model('Transfer', transferSchema);
>>>>>>> 0af3b617457134efff09409f1a05991477e1f5e6
