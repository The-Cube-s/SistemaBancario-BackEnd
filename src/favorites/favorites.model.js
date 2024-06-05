
import { Schema, model } from "mongoose";

const favoritesSchema = Schema({

    alias: {
        type: String,
        required: true
    },
    account: {
        type: Schema.ObjectId,
        ref: 'account',
        required: true
    },
    dpi: {
        type: String,
        required: true
    }
},
{
    versionKey: false
})

export default model('favorites', favoritesSchema)
