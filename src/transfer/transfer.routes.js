'use strict'

import { Router } from "express"
import { getAccountInfo, transferAmount } from './transfer.controller.js'
import { isAdmin, isClient, validateJwt } from "../middlewares/validate_Jwt.js"

const api = Router()

api.get('/getAccountInfo',[validateJwt], getAccountInfo)
api.post('/transferAmount' ,[validateJwt], transferAmount)

export default api