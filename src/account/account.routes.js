'use strict'

import { Router } from "express";
import { saveAccount, test, getAccount, convertData, getAccountBalance } from './account.controller.js'
import { isAdmin, validateJwt, isClient } from '../middlewares/validate_Jwt.js'

const api = Router()

api.get('/test', test)
api.post('/saveAccount', [validateJwt, isAdmin], saveAccount)
api.get('/getAccount', [validateJwt, isAdmin], getAccount)

//Convertidor de divisas
api.post('/convertData', [validateJwt], convertData) 
api.get('/getAccountBalance/:id', [validateJwt], getAccountBalance)

export default api