const express = require('express');
const app = express();
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const PRODUCT_BASE_URL = '/products';
const SALES_BASE_URL = '/sales';
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post(PRODUCT_BASE_URL, productController.createProduct);

app.get(`${PRODUCT_BASE_URL}/:id`, productController.getById);

app.get(PRODUCT_BASE_URL, productController.findAll);

app.put(`${PRODUCT_BASE_URL}/:id`, productController.updateProduct);

app.delete(`${PRODUCT_BASE_URL}/:id`, productController.deleteProduct);

app.post(SALES_BASE_URL, salesController.createSales);

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
