
import express from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/modules/products/product.routes'
import { orderRoutes } from './app/modules/orders/order.routes'
const app = express()

// parse
app.use(express.json())
app.use(cors())

// routes section
app.use('/api/products',ProductRoutes)

// order Route
app.use('/api/orders', orderRoutes)

// test section
app.get('/', (req, res) => {
  res.send('Server is Start Hurray')
})

export default app;