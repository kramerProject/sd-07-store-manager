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

const updateOneSale = async (req, res) => {
  try {
    //const { productId, quantity } = req.body;
    const arrayProducts = req.body;   
    const { id } = req.params;

    //const result = await saleService.updateSale(id, productId, quantity);
    const result = await saleService.updateSale(id, arrayProducts);
    if (!result) {
      res.status(HTTP404).json({ message: 'Sale not found :(' });
      return;
    }

    res.status(HTTP200).json({ _id: id, itensSold: arrayProducts });
  } catch (err) {
    console.log(err);
    res.status(HTTP500).json({ message: err.message });
  }
};
/*
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
  updateOneSale,
  //deleteProduct
};