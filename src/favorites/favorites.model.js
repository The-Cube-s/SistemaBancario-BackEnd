import { Schema, model, version } from "mongoose";

const favoritesSchema = Schema ({
    alias: {
        type: String,
        required: true
    },
    account: {
        type: Schema.ObjectId,
        ref: 'account',
        required: true
    }
},
{
    versionKey: false
})

export default model('favorites', favoritesSchema)