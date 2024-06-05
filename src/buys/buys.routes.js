'use strict'

import { Router } from "express"
import { test, saveBuy, updateBuy, deleteBuy, getBuy, getAllBuys } from './buys.controller.js'
import { isAdmin, isClient, validateJwt } from "../middlewares/validate_Jwt.js"

const api = Router()

api.get('/test', test)
//api.post('/depositMoney', [validateJwt, isClient], depositMoney)
api.post('/saveBuy', [validateJwt, isClient] ,saveBuy)
api.put('/updateBuy/:id', [validateJwt, isClient], updateBuy)
api.delete('/deleteBuy/:id', [validateJwt, isClient], deleteBuy)
api.get('/getBuy/:id', [validateJwt, isClient], getBuy)
api.get('/getAllBuys', [validateJwt, isClient], getAllBuys)

export default api