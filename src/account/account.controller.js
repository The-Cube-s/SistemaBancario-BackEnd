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
        //desestructure
        return res.send({accounts});
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting account' });
    }
};

//FUNCIÓN DE DIVISAS
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

        // Si el usuario existe pero no tiene ese tipo de cuenta
        if (account.typeofaccount !== req.body.typeofaccount) {
            return res.status(400).send({ message: `User does not have an account of type ${req.body.typeofaccount}` });
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