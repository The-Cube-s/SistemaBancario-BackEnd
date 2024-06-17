'use strict'

import { Router } from "express"
<<<<<<< HEAD
import { getAccountInfo, transferAmount } from './transfer.controller.js'
=======
import {
    getAccountInfo,
    transferAmount
} from './transfer.controller.js'

>>>>>>> 0af3b617457134efff09409f1a05991477e1f5e6
import { isAdmin, isClient, validateJwt } from "../middlewares/validate_Jwt.js"

const api = Router()

<<<<<<< HEAD
api.get('/getAccountInfo',[validateJwt], getAccountInfo)
api.post('/transferAmount' ,[validateJwt], transferAmount)
=======
api.get('/getAccountInfo',[validateJwt, isClient, isAdmin], getAccountInfo)
api.post('/transferAmount' ,[validateJwt, isClient], transferAmount)
>>>>>>> 0af3b617457134efff09409f1a05991477e1f5e6

export default api