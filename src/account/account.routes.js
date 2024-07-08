'use strict'

import { Router } from "express";
import { saveAccount, test, getAccount, convertData, getAccountBalance, deleteAccount, getAccountsByUser} from './account.controller.js'
import { isAdmin, validateJwt, isClient } from '../middlewares/validate_Jwt.js'

const api = Router()

api.get('/test', test)
api.post('/saveAccount', [validateJwt, isAdmin], saveAccount)
api.get('/getAccount', [validateJwt, isAdmin], getAccount)
api.delete('/deleteAccount/:id', [ validateJwt, isAdmin ], deleteAccount)
api.get('/getAccountsByUser', [validateJwt, isClient], getAccountsByUser)

//Convertidor de divisas
api.post('/convertData', [validateJwt], convertData) 
api.get('/getAccountBalance/:id', [validateJwt], getAccountBalance)

export default api