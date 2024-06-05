'use strict';

import Account from '../account/account.model.js';
import Favorite from './favorites.model.js';

export const addFavorite = async (req, res) => {
    try {
        const { noaccount, dpi, alias } = req.body;

        // Verificar que la cuenta exista
        const account = await Account.findOne({ noaccount });
        if (!account) return res.status(404).send({ message: 'Account not found' });

        // Verificar que el alias no esté vacío
        if (!alias) return res.status(400).send({ message: 'Alias is required' });

        // Crear y guardar el nuevo favorito
        const favorite = new Favorite({ account: account._id, alias, dpi });
        await favorite.save();

        return res.send({ message: 'Favorite added successfully', favorite });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error adding favorite' });
    }
};

// Función para obtener todos los favoritos
export const getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find().populate('account');
        return res.send(favorites);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting favorites' });
    }
};

// Función para realizar una transferencia rápida
export const quickTransfer = async (req, res) => {
    try {
        const { favoriteId, amount } = req.body;

        // Se Verificara que la cuenta registrada como favorita exista
        const favorite = await Favorite.findById(favoriteId).populate('account');
        if (!favorite) return res.status(404).send({ message: 'Favorite not found' });

        // Verificar que el monto sea positivo
        if (amount <= 0) return res.status(400).send({ message: 'Amount must be greater than zero' });

        // Verificar que la cuenta tenga saldo suficiente
        const account = favorite.account;
        if (account.balance < amount) return res.status(400).send({ message: 'Insufficient funds' });

        // Realizar la transferencia
        account.balance -= amount;
        await account.save();

        return res.send({ message: 'Transfer completed successfully', account });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error performing transfer' });
    }
};


// Función para eliminar un favorito por ID
export const deleteFavorite = async (req, res) => {
    try {
        const { id } = req.params;
        const favorite = await Favorite.findByIdAndDelete(id);
        if (!favorite) return res.status(404).send({ message: 'Favorite not found' });
        return res.send({ message: 'Favorite deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting favorite' });
    }
};

