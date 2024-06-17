'use strict'

import { Router } from "express";
<<<<<<< HEAD
import { saveAccount, test, getAccount, convertData, getAccountBalance } from './account.controller.js'
=======
import { saveAccount, test, getAccount, addFavorite, getFavorites, convertData, getAccountBalance } from './account.controller.js'
>>>>>>> 0af3b617457134efff09409f1a05991477e1f5e6
import { isAdmin, validateJwt, isClient } from '../middlewares/validate_Jwt.js'

const api = Router()

api.get('/test', test)
api.post('/saveAccount', [validateJwt, isAdmin], saveAccount)
api.get('/getAccount', [validateJwt, isAdmin], getAccount)
<<<<<<< HEAD

=======
// Ruta para agregar favoritos
api.post('/addFavorite', [validateJwt, isClient], addFavorite);
api.get('/getFavorites/:id', [validateJwt, isClient], getFavorites);  // Cambiado a :id
>>>>>>> 0af3b617457134efff09409f1a05991477e1f5e6
//Convertidor de divisas
api.post('/convertData', [validateJwt], convertData) 
api.get('/getAccountBalance/:id', [validateJwt], getAccountBalance)

export default api