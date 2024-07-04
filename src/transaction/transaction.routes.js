'use strict'

import { Router } from "express";
import { getMyTransfer, getMyDeposits} from './transaction.controller.js'
import { isAdmin, validateJwt, isClient } from '../middlewares/validate_Jwt.js'

const api = Router()

api.get('/getMyTransfer', [validateJwt], getMyTransfer)
api.get('/getMyDeposits', [validateJwt], getMyDeposits)



export default api