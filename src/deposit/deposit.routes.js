'use strict'

import { Router } from "express"
<<<<<<< HEAD
import { depositMoney, updateAmount } from './deposit.controller.js'
=======
import { depositMoney } from './deposit.controller.js'
>>>>>>> 0af3b617457134efff09409f1a05991477e1f5e6
import { isAdmin, isClient, validateJwt } from "../middlewares/validate_Jwt.js"

const api = Router()

<<<<<<< HEAD
api.post('/depositMoney', [validateJwt, isAdmin], depositMoney)
api.put('/updateAmount', [validateJwt, isAdmin], updateAmount)
=======
api.post('/depositMoney', [validateJwt, isClient], depositMoney)
>>>>>>> 0af3b617457134efff09409f1a05991477e1f5e6

export default api