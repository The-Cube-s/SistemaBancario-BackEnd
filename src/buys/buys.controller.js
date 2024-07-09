"use strict";

import Buys from "./buys.model.js";
import { checkUpdateBuy } from '../utils/validator.js'
//nuevos import
import User from "../user/user.model.js"
import Product from "../product/product.model.js"
import Account from '../account/account.model.js'
import jwt from 'jsonwebtoken'

export const test = (req, res) => {
    console.log('Test is running');
    return res.send({ message: 'Test is running' })
}

export const saveBuy = async (req, res) => {
    try {
        let data = req.body 

        let user = await User.findOne({ _id: data.user }) 
        if (!user) return res.status(404).send({ message: 'User not found' }) 

        let product = await Product.findOne({ _id: data.product }) 
        if (!product) return res.status(404).send({ message: 'Product not found' }) 

        let account = await Account.findOne({ user: data.user }) 
        if (!account) return res.status(404).send({ message: 'User account not found' }) 

        const userId = req.user._id 
        if (userId != data.user) return res.status(401).send({ message: 'Unauthorized user' }) 
        
        console.log(userId);

        let newAmount = parseInt(data.amount) 

        if (product.amount < newAmount) {
            return res.status(404).send({ message: 'Insufficient product amount available' }) 
        }

        if(data.amount <= 0){
            return res.status(400).send({ message: 'You cannot add quantity less than 0' })
        }

        if (account.balance < product.price * newAmount) {
            return res.status(403).send({ message: 'Insufficient balance' }) 
        }

        product.amount -= newAmount 
        await product.save() 

        account.balance -= product.price * newAmount 
        await account.save() 

        let buy = await Buys.findOne({ user: data.user, product: data.product }) 
        if (buy) {
            buy.amount += newAmount 
            await buy.save() 
        } else {
            let newBuy = new Buys({
                amount: newAmount,
                user: data.user,
                product: data.product
            }) 
            await newBuy.save() 
        }

        return res.send({ message: 'Purchase successful' }) 
    } catch (err) {
        console.error(err) 
            return res.status(500).send({ message: 'Purchase could not be saved', error: err.message }) 
    }
} 

export const updateBuy = async (req, res) => {
    try {
        let data = req.body
        let { id } = req.params
        let update = checkUpdateBuy(data, false)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data' })
        let updatedBuy = await Buys.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updatedBuy) return res.status(404).send({ message: 'Buy not found and not updated' })
        return res.send({ message: 'Buy was updated successfully', updatedBuy });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating buy' })
    }
}

export const deleteBuy = async (req, res) => {
    try {
        let { id } = req.params;
        let deletedBuy = await Buys.findOneAndDelete({ _id: id });
        if (!deletedBuy) return res.status(404).send({ message: 'Buy not found and not deleted' });
        return res.send({ message: 'Buy was deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting buy', error: err.message });
    }
}

export const getBuy = async (req, res) => {
    try {
        let { id } = req.params;
        let buy = await Buys.findById(id)
            .populate({
                path: 'user',
                select: 'name surname username DPI email phone'
            })
            .populate('product');
        if (!buy) return res.status(404).send({ message: 'Buy not found' });
        return res.send(buy);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error retrieving buy', error: err.message });
    }
}

export const getAllBuys = async (req, res) => {
    try {
        let buys = await Buys.find()
            .populate({
                path: 'user',
                select: 'name surname username DPI email phone'
            })
            .populate('product');
        return res.send(buys);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error retrieving buys', error: err.message });
    }
}


export const getUserBuys = async (req, res) => {
    try {
        const userId = req.user._id; // Suponiendo que el ID del usuario autenticado está en req.user._id
        let buys = await Buys.find({ user: userId })
            .populate({
                path: 'user',
                select: 'name'
            })
            .populate('product');
        if (!buys || buys.length === 0) {
            return res.status(404).send({ message: 'No purchases found for this user' });
        }
        return res.send(buys);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error retrieving user purchases', error: err.message });
    }
}