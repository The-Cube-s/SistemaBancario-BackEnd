'use strict';

import Account from './account.model.js';
import User from '../user/user.model.js';

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
        let account = await Account.find();
        return res.send(account);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting account' });
    }
};