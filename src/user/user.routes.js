import { Router } from 'express'
import { validateJwt, isAdmin } from '../middlewares/validate_Jwt.js'
import { test, login, register } from './user.controller.js'

const api = Router()

api.get('/test', test)
api.post('/login', login)
api.post('/register', [validateJwt, isAdmin], register)

export default api