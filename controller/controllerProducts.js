const productsModel = require('../model/productsModel');
const connection = require('../config/connection');
const {validateName} = require('../service/productService')
//falta fazer a validação
const addProduct = async (req, res) => {
    try {
        const { name, quantity } = req.body;
        // validateName(name);
        const newItem = await productsModel.addItem(name, quantity) //adiciona ao db
        res.status(201).json({newItem})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    addProduct
};