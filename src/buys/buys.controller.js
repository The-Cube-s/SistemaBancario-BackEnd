"use strict";

import Buys from "./buys.model.js";
import { checkUpdateBuy } from '../utils/validator.js'

export const test = (req, res) => {
    console.log('Test is running');
    return res.send({ message: 'Test is running' })
}

export const saveBuy = async (req, res) => {
    try {
        let data = req.body;
        let buy = new Buys(data);
        await buy.save();
        return res.send({ message: 'Save is successful' });
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