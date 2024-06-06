import { Router } from "express";
import { 
    saveAccount,
    test,
    getAccount,
    addFavorite,
    getFavorites
} from './account.controller.js';
import { isAdmin, validateJwt, isClient } from '../middlewares/validate_Jwt.js';

const api = Router();

api.get('/test', test);
api.post('/saveAccount', [validateJwt, isAdmin], saveAccount);
api.get('/getAccount', [validateJwt, isAdmin], getAccount);

// Ruta para agregar favoritos
api.post('/addFavorite', [validateJwt, isAdmin], addFavorite);
api.get('/getFavorites/:id', [validateJwt, isAdmin], getFavorites);  // Cambiado a :id

export default api;