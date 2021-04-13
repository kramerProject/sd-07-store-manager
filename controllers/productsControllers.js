const express = require('express');
const productsModel = require('../model/productsModel');
const { validateProducts } = require('../middlewares');
const codesHTTP = require('../schemas/codesHTTP');

const router = express.Router();

router.post('/', validateProducts, async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const newProduct = await productsModel.addProduct(name, quantity);
    if (newProduct) {
      return res.status(codesHTTP.created).json(newProduct);
    }
  } catch (error) {
    return res.status(codesHTTP.serverError).json({ message: 'Algo deu errado' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const products = await productsModel.getAll();
    if (products)
      return res.status(codesHTTP.ok).json({ products });
  } catch (error) {
    return res.status(codesHTTP.serverError).json({ message: 'Algo deu errado' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productsModel.getById(id);

    if (!product) 
      return res.status(codesHTTP.badRequest).json({ message: 'Produto não encontrado' });

    return res.status(codesHTTP.ok).json(product);

  } catch (error) {

    return res.status(codesHTTP.unprocessable).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }
});

router.put('/:id', validateProducts, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  try {
    const alteredProduct = await productsModel.updateProduct(id, name, quantity);
    return res.status(codesHTTP.ok).json(alteredProduct);

  } catch (error) {
    return res.status(codesHTTP.unprocessable).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await productsModel.deleteProduct(id);

    if (!deletedProduct) 
      return res.status(codesHTTP.badRequest).json({ message: 'Produto não encontrado' });

    return res.status(codesHTTP.ok).json(deletedProduct);

  } catch (error) {

    return res.status(codesHTTP.unprocessable).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }

});

module.exports = router;
