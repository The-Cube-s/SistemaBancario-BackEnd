'use strict'

import { Router } from "express";
import { getAccount, saveAccount, test } from './account.controller.js'
import { isAdmin, validateJwt } from '../middlewares/validate_Jwt.js'

const api = Router()

api.get('/test', test)
api.get('/getAccount', [validateJwt, isAdmin], getAccount)
api.post('/saveAccount', [validateJwt, isAdmin], saveAccount)

export default api