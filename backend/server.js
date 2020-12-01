import express from 'express'

import dotenv from 'dotenv'

import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()
connectDB()

const app = express()
app.use(express.json())
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running on port ${PORT}`))
