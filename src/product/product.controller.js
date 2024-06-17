'use strict'
import Product from './product.model.js'
import { checkUpdateProduct } from '../utils/validator.js'

export const saveProduct = async (req, res) => {
    try {
        let data = req.body;

        if (req.files && req.files.length > 0) {
            data.imagesProduct = req.files.map(file => '/uploads/' + file.filename);
        }

        let product = new Product(data);
        await product.save();
        return res.send({ message: 'Product saved successfully', product });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Product not saved', err });
    }
}

export const updateProduct = async (req, res) => {
    try {
        let { id } = req.params;
        let data = req.body;
        let update = checkUpdateProduct(data, false);

        let product = await Product.findById(id);
        if (!product) return res.status(404).send({ message: 'Product not found' });

        if (req.files && req.files.length > 0) {
            data.imagesProduct = req.files.map(file => '/uploads/' + file.filename);
        }

        if (!update) return res.status(400).send({ message: 'Submitted some data that cannot be updated or missing data' });
        
        let updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        );

        if (!updatedProduct) return res.status(404).send({ message: 'Product not found and not updated' });
        return res.send({ message: 'Product updated successfully', updatedProduct });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating product' });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        let { id } = req.params;
        let deleteProduct = await Product.findByIdAndDelete(id);
        if (!deleteProduct) return res.status(404).send({ message: 'Product not found and not deleted' });
        return res.send({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting product' });
    }
}

export const getProducts = async (req, res) => {
    try {
        let products = await Product.find();
        return res.send({ products });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting products' });
    }
}