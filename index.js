require('dotenv').config()
const express = require('express')
const app = express()
const Connection = require('./Config/db')
const authenticateRouter = require('./Routes/authentication.routes')
const userRouter = require('./Routes/user.routes')
const authorRouter = require('./Routes/author.routes')
const bookRouter = require('./Routes/book.routes')
const borrowRouter = require('./Routes/borrow.routes')
const PORT = process.env.PORT || 3000

// Middleware to parse JSON request bodies
app.use(express.json())

// Routes
app.use('/authenticate', authenticateRouter)
app.use('/users', userRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)
app.use('/borrowings', borrowRouter)

// Homepage route
app.get('/', (req, res)=>{
    res.send('Welcome to my Library management system API')
})

// Error Handling middleware
app.use((req, res)=>{
    res.status(404).send(`<h1>Page Not Found</h1>`)
})

// Start the server on the specified port or 3000 if not provided.
app.listen(PORT, async ()=>{
    try {
        await Connection;
        console.log(`srever is running on Port : ${PORT} and Connected to the DataBase`)
    } catch (error) {
        console.log(`Error Connecting to Database : ${error}`)
    }
})