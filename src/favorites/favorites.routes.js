import { Router } from 'express';
import { addFavorite, getFavorites, deleteFavorite, quickTransfer } from '../favorites/favorites.controller.js';
import { validateJwt, isAdmin } from '../middlewares/validate_Jwt.js';

const api = Router();

api.post('/addFavorite', [validateJwt, isAdmin], addFavorite);
api.get('/getFavorites', [validateJwt], getFavorites);
api.delete('/deleteFavorite/:id', [validateJwt, isAdmin], deleteFavorite);
api.post('/quickTransfer', [validateJwt], quickTransfer);

export default api;
