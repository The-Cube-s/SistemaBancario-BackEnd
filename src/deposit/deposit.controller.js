"use strict";
import User from '../user/user.model.js'

import Deposit from "./deposit.model.js";
import Account from "../account/account.model.js";
import moment from "moment-timezone";
import {checkUpdateAmount} from '../utils/validator.js'

export const depositMoney = async (req, res) => {
  try {
    let data = req.body;
    
    // Buscar la cuenta por noaccount
    let account = await Account.findOne({ noaccount: data.noaccount });
    if (!account)
      return res.status(404).send({ message: "Account does not exist" });

    // Convertir el amount a número antes de sumarlo
    let depositAmount = parseFloat(data.amount);
    if (isNaN(depositAmount)) {
      return res.status(400).send({ message: "Invalid amount" });
    }
    
    account.balance += depositAmount; 
    await account.save();

    let depositData = {
      account: account._id, // Usar el _id de la cuenta encontrada
      amount: depositAmount,
      date: moment().tz("America/Guatemala").toDate() 
    };
    let deposit = new Deposit(depositData);
    await deposit.save();

    return res.send({ message: "Deposit successful", account });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error depositing money" });
  }
};

export const updateAmount = async(req, res) =>{
  try {
    let data = req.body
    let { id } = req.params
    let update = checkUpdateAmount(data, false)
    if(!update) return res.status(404).send({message: 'Data is not save'})
    let updateAmount = await Deposit.findOneAndUpdate(
      {_id: id},
      data,
      { new: true }
    )
    if(!updateAmount) return res.status(404).send({message: 'Deposit not found and not updated'})
    return res.send({message: 'Deposit was updating successfully'})
  } catch (err) {
    console.error(err)
    return res.status(500).send({message: 'Have submitted some data that cannot be updated or missing data'})
  }
}

export const getAllDeposits = async (req, res) => {
  try {
      const deposits = await Deposit.find().populate('user', 'username').populate('account', 'noaccount');
      return res.send(deposits);
  } catch (error) {
      console.error('Failed to retrieve deposits:', error);
      return res.status(500).send({ message: 'Error retrieving all deposits' });
  }
};


export const getUserDeposits = async (req, res) => {
  try {
      const userId = req.user._id; 

      // Primero, encontramos todas las cuentas que pertenecen al usuario
      const accounts = await Account.find({ user: userId });
      if (accounts.length === 0) {
          return res.status(404).send({ message: "No accounts found for this user." });
      }

      // Extraemos los IDs de las cuentas para buscar depósitos relacionados
      const accountIds = accounts.map(account => account._id);

      // Hacemos un populate a usuario que esta ref al account
      const deposits = await Deposit.find({ account: { $in: accountIds } })
          .populate({
              path: 'account',
              select: 'noaccount typeofaccount',
              populate: {
                  path: 'user',
                  select: 'name'
              }
          });

      return res.send({ deposits });
  } catch (error) {
      console.error('Failed to retrieve user deposits:', error);
      return res.status(500).send({ message: 'Error retrieving user deposits' });
  }
};