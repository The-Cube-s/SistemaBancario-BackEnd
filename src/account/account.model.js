import { Schema, model } from "mongoose";

const accountSchema = Schema({
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
        ref: 'user',
        required: true
<<<<<<< HEAD
    }
=======
    },
    favorites: [
        {
            alias: String,
            noaccount: String,
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ]
>>>>>>> 0af3b617457134efff09409f1a05991477e1f5e6
},
{
    versionKey: false
})

export default model('account', accountSchema)