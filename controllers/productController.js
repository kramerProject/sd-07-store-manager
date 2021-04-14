const productService = require("../services/productService");

const createProduct = async (req, res) => {
	try {
		const { name, quantity } = req.body;
		const result = await productService.createProduct(name, quantity);
        
        res.status(201).json(result);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
};


module.exports = {
	createProduct,
};