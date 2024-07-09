'use strict'

import { Router } from "express"
import { test, saveBuy, updateBuy, deleteBuy, getBuy, getAllBuys, getUserBuys } from './buys.controller.js'
import { isAdmin, isClient, validateJwt } from "../middlewares/validate_Jwt.js"

const api = Router()

api.get('/test', test)
//api.post('/depositMoney', [validateJwt, isClient], depositMoney)
api.post('/saveBuy', [validateJwt] ,saveBuy)
api.put('/updateBuy/:id', [validateJwt], updateBuy)
api.delete('/deleteBuy/:id', [validateJwt], deleteBuy)
api.get('/getBuy/:id', [validateJwt], getBuy)
api.get('/getAllBuys', [validateJwt], getAllBuys)
api.get('/getUserBuys', [validateJwt], getUserBuys)

export default api