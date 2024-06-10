"use strict";

import Deposit from "./deposit.model.js";
import Account from "../account/account.model.js";
import moment from "moment-timezone";


export const depositMoney = async (req, res) => {
  try {
    let data = req.body;
    let account = await Account.findOne({ _id: data.account });
    if (!account)
      return res.status(404).send({ message: "Account does not exist" });

    // Convertir el amount a número antes de sumarlo
    let depositAmount = parseFloat(data.amount);
    if (isNaN(depositAmount)) {
      return res.status(400).send({ message: "Invalid amount" });
    }

    // Realizar el depósito
    account.balance += depositAmount; 
    await account.save();

    // Crear un registro del depósito
    let depositData = {
      account: data.account,
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