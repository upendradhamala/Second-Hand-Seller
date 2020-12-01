import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  if (products.length !== 0) {
    res.json(products)
  } else {
    res.status(400).json({ message: 'No products found' })
  }
})

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(400).json({ message: 'No product found' })
  }
})

export { getProducts, getProductById }
