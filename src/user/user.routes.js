import { Router } from 'express'
import { validateJwt, isAdmin, isClient } from '../middlewares/validate_Jwt.js'
import { test, login, register, updateUser } from './user.controller.js'

const api = Router()

api.get('/test', test)
api.post('/login', login)
api.post('/register', [validateJwt, isAdmin], register)
//Exclusivamente para el cliente
api.put('/updateUser/:id',[validateJwt], updateUser)

export default api