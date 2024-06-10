'use strict'
import { Router } from "express";
import { getFavorites } from "./favorites.contoller.js";
import { validateJwt, isClient } from "../middlewares/validate_Jwt";

const api = Router()

// Ruta para agregar favoritos
api.post('/addFavorite', [validateJwt, isClient], addFavorite);
api.get('/getFavorites/:id', [validateJwt, isClient], getFavorites);  // Cambiado a :id

export default api;