import { Router } from 'express'
import { validateJwt, isAdmin, isClient } from '../middlewares/validate_Jwt.js'
import { test, login, register, update, deleteUser } from './user.controller.js'

const api = Router()

api.get('/test', test)
api.post('/login', login)
api.post('/register', [validateJwt, isAdmin], register)
api.put('/update/:id', [validateJwt, isClient], update)
api.delete('/deleteUser/:id', [ validateJwt, isClient], deleteUser)

export default api