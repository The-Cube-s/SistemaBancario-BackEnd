'use strict'
import { Router } from 'express'
import { deleteProduct, saveProduct, updateProduct, getProducts } from './product.controller.js'
import { validateJwt, isAdmin, isClient } from '../middlewares/validate_Jwt.js'
import { validateImage } from '../middlewares/storage.js'

const api = Router()


//Solo el admin puede configurar los productos en los 3 campos
api.post('/saveProduct', validateImage.array('imagesProduct', 10), [validateJwt, isAdmin] ,saveProduct)
api.delete('/deleteProduct/:id', [validateJwt, isAdmin], deleteProduct)
api.put('/updateProduct/:id',validateImage.array('imagesProduct', 10), [validateJwt, isAdmin], updateProduct)
api.get('/getProducts',[validateJwt], getProducts)

export default api