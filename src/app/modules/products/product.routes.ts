import express from 'express'
import { productControllers } from './product.controller';

const router = express.Router()

router.post('/create-product',productControllers.CreateProducts)
router.get('/',productControllers.getAllProduct)
router.get('/:productId',productControllers.getSingleProduct)
router.delete('/:productId', productControllers.deleteProducts)
router.put('/:productId', productControllers.updateProduct)




export const ProductRoutes = router;