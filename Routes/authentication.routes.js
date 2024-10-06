require('dotenv').config()
const express = require('express')
const authenticateRouter = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../Models/user.model')

// Register Route
authenticateRouter.post('/register', async (req, res) => {
    try {
        const userData = req.body;
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = new userModel({ ...userData, password: hashedPassword })
        const savedUser = await newUser.save()
        res.status(201).json({ message: `${newUser.username} : User registered successfully`, savedUser })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error registering user' })
    }
})

// Login Route  - JWT Authentication
authenticateRouter.post('/login', async (req, res) => {
    // Validate request body
    if (!req.body.email || !req.body.password){
        return res.status(400).json({ message: 'Please provide email and password' });
    }
    
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if (!user){
            return res.status(404).json({ message: 'User not found' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword){
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
        res.status(201).json({message: `${user.username} : Logged in SuccessFully`, token})

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error logging in user' })
    }
})

module.exports = authenticateRouter;