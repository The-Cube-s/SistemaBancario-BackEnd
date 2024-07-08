'use strict'

import { Router } from "express"
import { depositMoney, updateAmount, getUserDeposits, getAllDeposits } from './deposit.controller.js'
import { isAdmin, isClient, validateJwt } from "../middlewares/validate_Jwt.js"

const api = Router()

api.post('/depositMoney', [validateJwt, isAdmin], depositMoney)
api.put('/updateAmount', [validateJwt, isAdmin], updateAmount)

//importantes para el historial y orden 
api.get('/getUserDeposits', [validateJwt, isClient], getUserDeposits)
api.get('/getAllDeposits', [validateJwt, isAdmin], getAllDeposits)


export default api