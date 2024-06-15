'use strict'
import { Router } from "express";
import { getAllFavorites, addFavorite, getById } from "./favorites.contoller.js";
import { validateJwt, isClient } from "../middlewares/validate_Jwt.js";

const api = Router()

// Ruta para agregar favoritos
api.post('/addFavorite', [validateJwt, isClient], addFavorite);
api.get('/getAllFavorites', [validateJwt, isClient], getAllFavorites);  // Cambiado a :id
api.post('/getById', [validateJwt, isClient], getById)

export default api;