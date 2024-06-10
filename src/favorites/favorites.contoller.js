'use strict'
import favorites from './favorites.model.js'

/*
// Controlador para agregar favoritos
export const addFavorite = async (req, res) => {
    try {
        let { user, alias, noaccount } = req.body;

        let userExists = await User.findOne({ _id: user });
        if (!userExists) return res.status(404).send({ message: 'User not found' });

        let account = await Account.findOne({ noaccount });
        if (!account) return res.status(404).send({ message: 'Account not found' });

        // Agregar el favorito al array de favoritos del account
        let favorite = { alias, noaccount, user };
        account.favorites.push(favorite);

        await account.save();
        return res.send({ message: 'Favorite added successfully', account });
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
        let accounts = await Account.find({ 'favorites.user': id });

        // Filtrar las cuentas para obtener solo los favoritos del usuario
        let favorites = accounts.flatMap(account => account.favorites.filter(favorite => favorite.user.equals(id)));

        // Mapear los favoritos para obtener solo los campos requeridos
        let simplifiedFavorites = favorites.map(favorite => ({
            alias: favorite.alias,
            noaccount: favorite.noaccount,
            dpi: favorite.dpi,
            //typeofaccount: favorite.typeofaccount // Usar el tipo de cuenta del favorito No se puede agregar 
            //Ya que no esta dentro de "favorites": [
            {
                "alias": "Don ux",
                "noaccount": "05700620293546200882",
                "dpi": "92921890616247936458",
                "user": "665ffa45938d010186eeb23f"
                "typeofaccount": "Ahorro"
            }
            ]
        }));

        // Enviar la respuesta con la información simplificada de favoritos
        return res.send(simplifiedFavorites);
    } catch (err) {
        // Capturar cualquier error y enviar una respuesta de error
        console.error(err);
        return res.status(500).send({ message: 'Error getting favorites', error: err });
    }
};
*/