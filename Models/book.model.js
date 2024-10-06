const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    ISBN: {type: String, required: true},
    summary: String,
    publicationDate: Date,
    genres: [String],
    copiesAvailable: {type: Number,default:1},
    author: [{type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true}],
    borrowedBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}],
},{
    timestamps: true,
    versionKey: false
})

const bookModel = mongoose.model('Book', BookSchema)

module.exports = bookModel;