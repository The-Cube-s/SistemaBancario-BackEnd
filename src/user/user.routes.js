import { Router } from 'express'
import { validateJwt, isAdmin, isClient } from '../middlewares/validate_Jwt.js'
import { test, login, register, update, deleteUser, getUser } from './user.controller.js'

const api = Router()

api.get('/test', test)
api.get('/getUser', [validateJwt, isAdmin],getUser)
api.post('/login', login)
api.post('/register', [validateJwt, isAdmin], register)
api.put('/update/:id', [validateJwt, isClient], update)
api.delete('/deleteUser/:id', [ validateJwt, isAdmin], deleteUser)

export default api