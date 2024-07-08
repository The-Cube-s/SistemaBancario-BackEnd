'use strict'

import Bill from './bill.model.js'
import User from '../user/user.model.js'
import Product from '../product/product.model.js'
import Buy from '../buys/buys.model.js'
import fs from 'fs'
import path from 'path'
import PDFDocument from 'pdfkit'

export const test = (req, res) =>{
    return res.send('Test is runnig')
}

export const makeBill = async(req, res) => {
    try {
        const data = req.body;
        const userId = req.user._id;
        console.log(data);
        
        // Buscar las compras del usuario
        const buys = await Buy.find({ user: userId });
        if (!buys || buys.length === 0) return res.status(404).send({ message: 'Buys not found' });
        console.log(buys);

        // Obtener el usuario
        const user = await User.findOne({ _id: userId });
        if (!user) return res.status(404).send({ message: `User with id ${userId} was not found` });
        console.log(user);

        const bills = [];
        let totalPay = 0;

        for (const buy of buys) {
            // Obtener el producto para cada compra
            const product = await Product.findById(buy.product);
            if (!product) return res.status(404).send({ message: `Product not found` });
            console.log(product);

            const totalProduct = buy.amount * product.price;
            totalPay += totalProduct;
            console.log(totalProduct);

            const bill = new Bill({
                date: new Date(),
                totalprice: totalProduct,
                buys: buy._id
            });
            await bill.save();
            bills.push(bill);
        }

        const pdfFolder = './invoices';
        if (!fs.existsSync(pdfFolder)) {
            fs.mkdirSync(pdfFolder);
        }

        const pdfPath = path.resolve(pdfFolder, `factura_${Date.now()}.pdf`);
        const doc = new PDFDocument();

        doc.pipe(fs.createWriteStream(pdfPath));
        doc.fontSize(25).text(`Factura`, { align: 'center' }).moveDown(2);

        for (const bill of bills) {
            const buy = await Buy.findById(bill.buys).populate('product');
            const total = bill.totalprice;

            doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
            doc.fontSize(15).text(`Fecha: ${bill.date.toLocaleDateString()}`, { align: 'right' });
            doc.fontSize(15).text(`ID del carrito: ${buy._id}`);
            doc.moveDown();
            doc.moveTo(49, doc.y).lineTo(550, doc.y).stroke();
            doc.fontSize(15).text('Productos:', { underline: true }).moveDown();
            const product = await Product.findById(buy.product);
            doc.fontSize(12).text(`${product.name} - Cantidad: ${buy.amount} - Precio unitario: ${product.price}Q`);
            doc.fontSize(16).text(`Total del producto: ${total}`).moveDown();

            doc.moveDown();
            doc.addPage();
        }

        // Mostrar el total a pagar en el documento
        doc.fontSize(16).text(`Total a pagar: ${totalPay} Q`, { align: 'right' }).moveDown();
        doc.end();

        return res.send(pdfPath);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: `Error to make bill: ${err.message}` });
    }
};
