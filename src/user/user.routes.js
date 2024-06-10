import { Router } from 'express'
import { validateJwt, isAdmin, isClient } from '../middlewares/validate_Jwt.js'
import { test, login, register, update, deleteUser, getUser, updateAdmin } from './user.controller.js'

const api = Router()

api.get('/test', test)
api.get('/getUser', [validateJwt, isAdmin],getUser)
api.post('/login', login)
api.post('/register', [validateJwt, isAdmin], register)
api.delete('/deleteUser/:id', [ validateJwt, isAdmin], deleteUser)
//Update de admins
api.put('/updateAdmin/:id', [validateJwt, isAdmin], updateAdmin)
//Funcionalidades del cliente
api.put('/update/:id', [validateJwt, isClient], update)

export default api