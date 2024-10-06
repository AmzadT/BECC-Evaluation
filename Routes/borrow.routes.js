const express = require('express')
const borrowBookTransactionModel = require('../Models/borrowBookTransaction.model')
const checkAccess = require('../Middlewares/authorization.middleware')
const borrowRouter = express.Router()

borrowRouter.post('/', checkAccess('Member'), (req, res) => {
    try {
        const book = new borrowBookTransactionModel.create(req.body)
        if (!book) {
            return res.status(400).json({ message: 'Invalid Data' })
        }
        res.status(201).json(book)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
})

borrowRouter.get('/',checkAccess('Admin'), async (req, res) => {
    try {
        const books = await borrowBookTransactionModel.find()
        if (!books) {
            return res.status(404).json({ message: 'No books found' })
        }
        res.json(books)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
})

borrowRouter.get('/:id',checkAccess('Member'), async (req, res) => {
    try {
        const id = req.params.id
        const book = await borrowBookTransactionModel.findById(id)
        if (!book) {
            return res.status(404).json({ message: 'No book found' })
        }
        res.json(book)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
})

borrowRouter.put('/:id',checkAccess('Member', 'Admin'), async (req, res) => {
    try {
        const id = req.params.id
        const updatedBook = await borrowBookTransactionModel.findByIdAndUpdate(id, req.body, { new: true })
        if (!updatedBook) {
            return res.status(404).json({ message: 'No book found' })
        }
        res.json(updatedBook)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
})

module.exports = borrowRouter;