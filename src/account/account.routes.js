'use strict'

import { Router } from "express";
import { saveAccount, test, getAccount, addFavorite, getFavorites, convertData } from './account.controller.js'
import { isAdmin, validateJwt, isClient } from '../middlewares/validate_Jwt.js'

const api = Router()

api.get('/test', test)
api.post('/saveAccount', [validateJwt, isAdmin], saveAccount)
api.get('/getAccount', [validateJwt, isAdmin], getAccount)
// Ruta para agregar favoritos
api.post('/addFavorite', [validateJwt, isClient], addFavorite);
api.get('/getFavorites/:id', [validateJwt, isClient], getFavorites);  // Cambiado a :id
//Convertidor de divisas
api.post('/convertData', [validateJwt], convertData) 

export default api