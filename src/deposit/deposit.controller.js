"use strict";

import Deposit from "./deposit.model.js";
import Account from "../account/account.model.js";

export const depositMoney = async (req, res) => {
    try {
        let data = req.body;
        let account = await Account.findOne({ _id: data.account });
        if (!account)
          return res.status(404).send({ message: "Account does not exist" });
    
        // Validar el tipo de cuenta
        
    
        // Realizar el depósito
        account.balance += data.amount; // Suponiendo que `data.amount` contiene la cantidad a depositar
        await account.save();
    
        // Crear un registro del depósito
        let depositData = {
          account: data.account,
          amount: data.amount,
          date: new Date() // Fecha actual del depósito
        };
        let deposit = new Deposit(depositData);
        await deposit.save();
    
        return res.send({ message: "Deposit successful", account });
      } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error depositing money" });
      }
    };