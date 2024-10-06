const express = require('express');
const userModel = require('../Models/user.model');
const userRouter = express.Router()
const checkAccess = require('../Middlewares/authorization.middleware')

userRouter.get('/',checkAccess('Admin'), async (req, res) => {
    try {
        const users = await userModel.find()
        if (!users) {
            return res.status(404).json({ message: 'No users found' })
        }
        res.json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error getting users' })
    }
})

userRouter.get('/:id',checkAccess('Admin', 'Member'), async (req, res) => {
    try {
        const id = req.params.id
        const user = await userModel.findById(id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error getting user' })
    }
})

// userRouter.post('/', async (req, res) => {
//     try {
//         const newUser = new userModel.create(req.body)
//         const savedUser = await newUser.save()
//         res.status(201).json({ message: `${newUser.username} : User created successfully`, savedUser })
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message: 'Error creating user' })
//     }
// })

userRouter.put('/:id',checkAccess('Admin', 'Member'), async (req, res) => {
    try {
        const id = req.params.id
        const user = await userModel.findByIdAndUpdate(id, req.body, { new: true })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error updating user' })
    }
})

userRouter.delete('/:id',checkAccess('Admin'), async (req, res) => {
    try {
        const id = req.params.id
        const deletedUser = await userModel.findByIdAndDelete(id)
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.json({ message: 'User deleted successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error deleting user' })
    }
})

module.exports = userRouter;