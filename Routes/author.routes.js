const express = require('express');
const authorModel = require('../Models/author.model');
const checkAccess = require('../Middlewares/authorization.middleware');
const authorRouter = express.Router()

authorRouter.post('/',checkAccess('Admin'), (req, res)=>{
    try {
        const author = new authorModel.create(req.body)
        res.status(201).json(author)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

authorRouter.get('/', async (req, res)=>{
    try {
        const authors = await authorModel.find()
        if(!authors){
            return res.status(404).json({message: 'No authors found'})
        }
        res.status(200).json(authors)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

authorRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const author = await authorModel.findById(id)
        if(!author){
            return res.status(404).json({message: 'Author not found'})
        }
        res.status(200).json(author)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

authorRouter.put('/:id',checkAccess('Admin'), async (req, res) => {
    try {
        const id = req.params.id
        const updatedAuthor = await authorModel.findByIdAndUpdate(id, req.body, {new: true})
        if(!updatedAuthor){
            return res.status(404).json({message: 'Author not found'})
        }
        res.status(200).json(updatedAuthor)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

authorRouter.delete('/:id',checkAccess('Admin'), async (req, res) => {
    try {
        const id = req.params.id
        const author = await authorModel.findByIdAndDelete(id)
        if(!author){
            return res.status(404).json({message: 'Author not found'})
        }
        res.status(204).send()
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = authorRouter;