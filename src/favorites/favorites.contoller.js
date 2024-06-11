'use strict'
import Favorite from './favorites.model.js'
import Account from '../account/account.model.js'

// Controlador para agregar favoritos
export const addFavorite = async (req, res) => {
    try {
        let data = req.body
        let account = await Account.findOne({ _id: data.account })
        if(!account) return res.status(404).send({ message: 'Account not found'})
        let favorites = new Favorite(data)
        await favorites.save()
        return res.send({message: 'Add favorites was successfully'})
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error adding favorite' });
    }
};


export const getFavorites = async (req, res) => {
    try {
        // Obtener el ID del usuario de la solicitud
        let id = req.params.id;
        console.log(`Received id: ${id}`);
        // Buscar las cuentas que contienen al usuario en sus favoritos
        let accounts = await Account.find({ 'favorites.user': id })
        // Filtrar las cuentas para obtener solo los favoritos del usuario
        let favorites = accounts.flatMap(account => account.favorites.filter(favorite => favorite.user.equals(id)))
        // Enviar la respuesta con la información simplificada de favoritos
        return res.send(simplifiedFavorites);
    } catch (err) {
        // Capturar cualquier error y enviar una respuesta de error
        console.error(err);
        return res.status(500).send({ message: 'Error getting favorites', error: err });
    }
};
