const express = require('express');
const bookModel = require('../Models/book.model');
const checkAccess = require('../Middlewares/authorization.middleware');
const bookRouter = express.Router()

bookRouter.post('/',checkAccess('Admin'), (req, res) => {
    try {
        const book = new bookModel.create(req.body)
        if (!book) {
            return res.status(400).json({ message: 'Invalid Data' })
        }
        res.status(201).json(book)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
})

bookRouter.get('/', async (req, res) => {
    // search by title (title)
    const title = req.query.title;
    if (title) {
        const books = await bookModel.find({ title: new RegExp(title, 'i') });
        if (!books) {
            return res.status(404).json({ message: 'No books found' })
        }
        res.status(200).json(books)
    }

    // pagination (page)
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginateBooks = await bookModel.find().skip(startIndex).limit(limit)
    if (paginateBooks.length < endIndex) {
        return res.status(404).json({ message: 'No books found' })
    }
    res.status(200).json(paginateBooks)
    
    try {
        const books = await bookModel.find()

        if (!books) {
            return res.status(404).json({ message: 'No books found' })
        }
        res.status(200).json(books)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
})

bookRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const book = await bookModel.findById(id)
        if (!book) {
            return res.status(404).json({ message: 'Book not found' })
        }
        res.status(200).json(book)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
})

bookRouter.put('/:id',checkAccess('Admin'), async (req, res) => {
    try {
        const id = req.params.id
        const updatedBook = await bookModel.findByIdAndUpdate(id, req.body, { new: true })
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' })
        }
        res.status(200).json(updatedBook)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
})

bookRouter.delete('/:id',checkAccess('Admin'), async (req, res) => {
    try {
        const id = req.params.id
        const deletedBook = await bookModel.findByIdAndDelete(id)
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' })
        }
        res.status(200).json(deletedBook)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }

})

module.exports = bookRouter;