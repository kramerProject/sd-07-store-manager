const productService = require('../Service/ProductsService');

const codes = {
  success: 200,
  create: 201,
  error: 400
};


async function create(req, response) {
  try {
    const data = req.body;
    const result = await productService.create(data);
    return response.status(codes.create).json(result.data);
  } catch (e) {
    return response.status(codes.error).json({ error: e.message  });
  }
}
async function findAll(request, response) {
  try {
    const products = await productService.getAll();
    return response.status(codes.success).json({ products });
  } catch (e) {
    return response.status(codes.error).json({error: e.message});
  }
}

module.exports= { create, findAll };
