'use strict';

import Account from './account.model.js';
import User from '../user/user.model.js';
import axios from "axios";

const mathRandom = () => {
    let num = '';
    for (let i = 0; i < 20; i++) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
};

export const test = (req, res) => {
    console.log('test is running');
    return res.send({ message: 'Test is running' });
};

export const saveAccount = async (req, res) => {
    try {
        let data = req.body;
        let user = await User.findOne({ _id: data.user });
        if (!user) return res.status(404).send({ message: 'User not found' });

        // Verificar si ya tiene una cuenta del tipo especificado
        let existingAccounts = await Account.find({ user: data.user });

        let hasMonetaria = existingAccounts.some(account => account.typeofaccount === 'MONETARIA');
        let hasAhorro = existingAccounts.some(account => account.typeofaccount === 'AHORRO');

        if ((data.typeofaccount === 'MONETARIA' && hasMonetaria) || (data.typeofaccount === 'AHORRO' && hasAhorro)) {
            return res.status(401).send({ message: `This user only can has 1 ${data.typeofaccount.toLowerCase()} account` });
        }

        if (data.balance < 0) return res.status(401).send({ message: 'The balance cannot be less than 0' });

        data.noaccount = await mathRandom();
        let account = new Account(data);
        await account.save();
        return res.send({ message: 'Account saved successfully', account });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error saving account' });
    }
};

export const getAccount = async (req, res) => {
    try {
        let accounts = await Account.find();
        return res.send({ accounts });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting accounts' });
    }
};

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
            /*{
                "alias": "Don ux",
                "noaccount": "05700620293546200882",
                "dpi": "92921890616247936458",
                "user": "665ffa45938d010186eeb23f"
                "typeofaccount": "Ahorro"
            }
            ]*/
        }));

        // Enviar la respuesta con la información simplificada de favoritos
        return res.send(simplifiedFavorites);
    } catch (err) {
        // Capturar cualquier error y enviar una respuesta de error
        console.error(err);
        return res.status(500).send({ message: 'Error getting favorites', error: err });
    }
};

//Función para convertir dinero
export const convertData = async (req, res) => {
    const path = process.env.API_URL;
    const key = process.env.API_KEY;
    const { from, to } = req.body;
    const userId = req.user._id; // Obtener el ID del usuario autenticado

    try {
        // Buscar la cuenta más reciente del usuario
        const account = await Account.findOne({ user: userId }).sort({ _id: -1 });
        if (!account) return res.status(404).send({ message: 'Account not found' });

        const amount = account.balance;
        const url = `${path}/${key}/pair/${from}/${to}/${amount}`;

        const { data } = await axios.get(url);

        if (data && data.result === 'success') {
            return res.send({
                from: from,
                to: to,
                conversionRate: data.conversion_rate,
                convertedAmount: data.conversion_result
            });
        }

        return res.status(418).send({ message: 'Error en la solicitud', data });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al realizar la conversion', error });
    }
}

export const getAccountBalance = async (req, res) => {
    try {
        const accountId = req.params.id;
        const account = await Account.findById(accountId);

        if (!account) {
            return res.status(404).send({ message: 'Account not found' });
        }

        const user = await User.findById(account.user);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Verificando si el usuario autenticado es ADMIN o el propietario de la cuenta
        if (req.user.role === 'ADMIN' || req.user._id.toString() === user._id.toString()) {
            return res.send({ balance: account.balance });
        } else {
            return res.status(403).send({ message: 'Access denied' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting account balance' });
    }
};