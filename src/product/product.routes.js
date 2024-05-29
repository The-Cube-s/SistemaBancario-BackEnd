'use strict'
import { Router } from 'express'
import { deleteProduct, saveProduct, test, updateProduct } from './product.controller.js'
import { validateJwt } from '../middlewares/validate_Jwt.js'

const api = Router()

api.get('/test', test)
api.post('/saveProduct', [validateJwt] ,saveProduct)
api.delete('/deleteProduct/:id', [validateJwt], deleteProduct)
api.put('/updateProduct/:id', [validateJwt], updateProduct)

export default api