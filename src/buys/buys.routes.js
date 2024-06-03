'use strict'

import { Router } from "express"
import { test } from './buys.controller.js'
import { isAdmin, isClient, validateJwt } from "../middlewares/validate_Jwt.js"

const api = Router()

api.get('/test', test)
//api.post('/depositMoney', [validateJwt, isClient], depositMoney)

export default api