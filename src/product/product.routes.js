'use strict'
import { Router } from 'express'
import { deleteProduct, saveProduct, test, updateProduct, getProducts } from './product.controller.js'
import { validateJwt, isAdmin, isClient } from '../middlewares/validate_Jwt.js'

const api = Router()

api.get('/test', test)
//Solo el admin puede configurar los productos en los 3 campos
api.post('/saveProduct', [validateJwt, isAdmin] ,saveProduct)
api.delete('/deleteProduct/:id', [validateJwt, isAdmin], deleteProduct)
api.put('/updateProduct/:id', [validateJwt, isAdmin], updateProduct)
api.get('/getProducts',[validateJwt], getProducts)

export default api