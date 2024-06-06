'use strict'

import { Router } from "express";
import { saveAccount, test, getAccount, convertData } from './account.controller.js'
import { isAdmin, validateJwt } from '../middlewares/validate_Jwt.js'

const api = Router()

api.get('/test', test)
api.post('/saveAccount', [validateJwt, isAdmin], saveAccount)
api.get('/getAccount', [validateJwt, isAdmin], getAccount)
api.post('/convertData', [validateJwt], convertData) // Pendiente validacion

export default api