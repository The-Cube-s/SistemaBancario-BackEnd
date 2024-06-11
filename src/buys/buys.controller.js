"use strict";

import Buys from "./buys.model.js";
import { checkUpdateBuy } from '../utils/validator.js'
//nuevos import
import User from "../user/user.model.js"
import Product from "../product/product.model.js"
import jwt from 'jsonwebtoken'

export const test = (req, res) => {
    console.log('Test is running');
    return res.send({ message: 'Test is running' })
}

export const saveBuy = async (req, res) => {
    try {
        let data = req.body;
        let user = await User.findOne({ _id: data.user })
        let product = await Product.findOne({ _id: data.product })
        let amountPrd = product.amount
        if(!user ) return res.status(404).send({message: 'User not found'})
        if(!product ) return res.status(404).send({message: 'Product not found'})
        let secretKey = process.env.SECRET_KEY
        let token = req.headers.authorization
        const { uid } = jwt.verify(token, secretKey)
        if(uid !== data.user) return res.status(401).send({ message: 'Enter your ID to make a buy'})
        if( amountPrd === 0 ) return res.status(401).send({ message: 'We do not have that producto avaible'})
        let buy = await Buys.findOne({ user: data.user, product: data.product })
        if(buy){
            buy.amount = +buy.amount + +data.amount
        }else{
            buy = new Buys({
                amount: data.amount,
                user: data.user,
                product: data.product
            })
        }
        let amount = buy.amount
        if(amountPrd < amount) return res.status(404).send({message: 'Dont exists the amount required'})
        product.amount -= buy.amount
        await product.save()
        await buy.save();
        return res.send({ message: 'Buy is successful' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Buy was not saved', error: err.message });
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

//compra de producto 
export const buyProduct = async (req, res) => {
    try {
        const { clientId, productId } = req.body
        
        // Buscar al cliente por su ID
        const client = await User.findById(clientId)
        if (!client) {
            return res.status(404).send({ message: "Client not found" })
        }

        // Buscar el producto por su ID
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).send({ message: "Product not found" })
        }

        // Verificar si el saldo del cliente es suficiente para comprar el producto
        if (client.balance < product.price) {
            return res.status(400).send({ message: "Insufficient balance to buy the product" })
        }

        // Crear una nueva compra
        const buy = new Buys({
            amount: product.price,  // El monto de la compra es el precio del producto
            user: client._id,       // El usuario que realiza la compra
            product: product._id    // El producto que se está comprando
        });
        await buy.save() //compra en la base de datos

        // Restar el precio del producto del saldo del cliente
        client.balance -= product.price
        await client.save() // saldo actualizado del cliente

        // Devolver una respuesta exitosa
        return res.send({ message: "Purchase successful", buy })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: "Error buying product", error: err.message })
    }
};