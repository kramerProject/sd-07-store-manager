const saleService = require('../services/saleService');
const HTTP200 = 200;
const HTTP201 = 201;
const HTTP404 = 404;
const HTTP500 = 500;
const createSale = async (req, res) => {  
  try {
    const products = req.body;
    const result = await saleService.createSale(products);
    
    res.status(HTTP200).json(result);
  } catch (err) {
    console.log(err);
    res.status(HTTP500).json({ message: err.message });
  }
};

const allSales = async (req, res) => {
  try {
    const result = await saleService.getAllSale();
        
    res.status(HTTP200).json({sales: result});
    
  } catch (err) {
    console.log(err);
    res.status(HTTP500).json({ message: err.message });
  }
};

const oneSale = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await saleService.getOneSale(id);
        
    res.status(HTTP200).json(result);
    
  } catch (err) {
    console.log(err);
    res.status(HTTP500).json({ message: err.message });
  }
};
/*
const updateOneProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;

    const result = await productService.updateProduct(id, name, quantity);
    if (!result) {
      res.status(HTTP404).json({ message: 'Produto não encontrado :(' });
      return;
    }

    res.status(HTTP200).json({ _id: id, name, quantity });
  } catch (err) {
    console.log(err);
    res.status(HTTP500).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const oneProductDeleted = await productService.getOneProduct(id);

    const result = await productService.deleteOneProduct(id);

    res.status(HTTP200).json(oneProductDeleted);;
  } catch (err) {
    console.log(err);
    res.status(HTTP500).json({ message: err.message });
  }
};

*/
module.exports = {
  createSale,
  allSales,
  oneSale,
  //updateOneProduct,
  //deleteProduct
};