'use strict'

import { Router } from "express"
import {
    getAccountInfo,
    transferAmount
} from './transfer.controller.js'

const api = Router()

api.get('/account', getAccountInfo)
api.post('/transfer', transferAmount)

export default api