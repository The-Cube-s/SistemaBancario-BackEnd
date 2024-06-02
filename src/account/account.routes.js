'use strict'

import { Router } from "express";
import { saveAccount, test, getAccount } from './account.controller.js'
import { isAdmin, validateJwt } from '../middlewares/validate_Jwt.js'

const api = Router()

api.get('/test', test)
api.post('/saveAccount', [validateJwt, isAdmin], saveAccount)
api.get('/getAccount', [validateJwt, isAdmin], getAccount)

export default api