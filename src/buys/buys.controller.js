"use strict";

import Buys from "./buys.model.js";

export const test = (req, res) =>{
    console.log('Test is running');
    return res.send({message: 'Test is running'})
}

export const saveBuy = async (req, res) => {
    try {
        let data = req.body
        let buy = new Buys(data)
        await buy.save()
        return res.send({ message: 'Save is successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Buy is not save', err: err })
    }
}

export const updateBuy = async (req, res) => {
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
