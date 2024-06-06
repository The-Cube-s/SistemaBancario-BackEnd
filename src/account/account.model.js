import { Schema, model } from "mongoose";

const favoriteSchema = new Schema({
    alias: {
        type: String,
        required: true
    },
    noaccount: {
        type: String,
        required: true
    },
    dpi: {
        type: String,
        required: true
    },
    user: { // Añade la referencia al usuario aquí
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, { _id: false });

const accountSchema = new Schema({
    noaccount: {
        type: String,
        required: true,
        unique: true
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
        ref: 'User',
        required: true
    },
    favorites: [favoriteSchema] // Añadimos un array de favoritos
}, {
    versionKey: false
});

export default model('Account', accountSchema);
