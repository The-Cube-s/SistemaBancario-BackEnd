'use strict'

import { Router } from "express"
import { depositMoney } from './deposit.controller.js'
import { isAdmin, isClient, validateJwt } from "../middlewares/validate_Jwt.js"

const api = Router()

api.post('/depositMoney', [validateJwt, isAdmin], depositMoney)

export default api