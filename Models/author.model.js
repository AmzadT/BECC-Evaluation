const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    biography: String,
    dateOfBirth: Date,
    nationality: String,
    books: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true}]
},{
    timestamps: true,
    versionKey: false
})

const authorModel = mongoose.model('Author', AuthorSchema)

module.exports = authorModel;