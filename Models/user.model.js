const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'Admin', 'Member', 'member'],
        default: 'Member'
    },
    name: {type: String, required: true},
    borrowedBooks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true}],
},{
    timestamps: true,
    versionKey: false
})

const userModel = mongoose.model('User', UserSchema)

module.exports = userModel;