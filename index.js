const express = require('express');
const productController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const errorMiddleware = require('./middlewares/error');

const app = express();

const PORT = 3000;

app.use(express.json());

//PRODUCTS
//READ
app.get('/products', productController.getAllProducts);
//READ ID
app.get('/products/:id', productController.findByIdProduct);
//CREATED
app.post('/products', productController.insertProduct);
//UPDATE
app.put('/products/:id', productController.updateProduct);
//DELETE
app.delete('/products/:id', productController.deleteProduct);

//SALES
//CREATED
app.post('/sales', salesController.addSales);

//READ
app.get('/sales', salesController.getAllSales);

//ID
app.get('/sales/:id', salesController.findByIdSales);

//DELETE
app.delete('/sales/:id', salesController.deleteSales);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`App ouvindo a porta ${PORT}`);
});
