'use strict'

import { Router } from "express";
import { saveAccount, test } from './account.controller.js'
import { isAdmin, validateJwt } from '../middlewares/validate_Jwt.js'

const api = Router()

api.get('/test', test)
api.post('/saveAccount', [validateJwt, isAdmin], saveAccount)

export default api