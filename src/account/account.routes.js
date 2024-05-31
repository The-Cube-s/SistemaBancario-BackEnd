'use strict'

import { Router } from "express";
<<<<<<< HEAD
import { getAccount, saveAccount, test } from './account.controller.js'
=======
import { saveAccount, test } from './account.controller.js'
>>>>>>> cd9232a1c22353d0ceac1943d526db0364888edd
import { isAdmin, validateJwt } from '../middlewares/validate_Jwt.js'

const api = Router()

api.get('/test', test)
<<<<<<< HEAD
api.get('/getAccount', [validateJwt, isAdmin], getAccount)
=======
>>>>>>> cd9232a1c22353d0ceac1943d526db0364888edd
api.post('/saveAccount', [validateJwt, isAdmin], saveAccount)

export default api