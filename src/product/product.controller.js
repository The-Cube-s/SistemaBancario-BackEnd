'use strict'
import Product from './product.model.js'
import { checkUpdateProduct } from '../utils/validator.js'

export const test = (req, res) => {
    console.log('test is running');
    return res.send({ message: 'Test is running' })
}

export const saveProduct = async (req, res) => {
    try {
        let data = req.body
        let product = new Product(data)
        await product.save()
        return res.send({ message: 'Save is successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Product is not save', err: err })
    }
}

export const updateProduct = async (req, res) => {
    try {
        let data = req.body
        let { id } = req.params
        let update = checkUpdateProduct(data, false)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data' })
        let updatedProduct = await Product.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updatedProduct) return res.status(404).send({ message: 'Producto not found and not update' })
        return res.send({ message: `Product was updating successfully`, updatedProduct })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating product' })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        let { id } = req.params
        let deleteProduct = await Product.findOneAndDelete({ _id: id })
        if (!deleteProduct) return res.status(404).send({ message: 'Product not find and not delete' })
        return res.send({ message: 'Product was delete successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleteing product' })
    }
}

export const getProducts = async(req, res) =>{
    try {
        let products = await Product.find()
        return res.send({products})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error getting users'})
    }
}