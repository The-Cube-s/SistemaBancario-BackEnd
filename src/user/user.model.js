import { Schema, model } from "mongoose";

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },    
    DPI: {
        type: Number,
        unique: true,
        maxlength: 13,
        minlength: 13,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minlength: [8, 'Password must be 8 characteres'],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        minlength: 8,
        maxlength: 8,
        required: true
    },
    jobname: {
        type: String,
        required: true
    },
    monthlyincome: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: ['CLIENT', 'ADMIN'],
        required: true
    }
},{
    versionKey: false
})

export default model('user', userSchema)