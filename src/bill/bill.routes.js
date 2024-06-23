'use strict'

import { Router } from "express"
import { validateJwt, isClient } from '../middlewares/validate_Jwt.js'
import { test, makeBill } from "./bill.controller.js"

const api = Router()

api.get('/test', test)
api.post('/makeBill', [validateJwt], makeBill)

export default api