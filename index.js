const express = require('express');
const productsRoute = require('./routes/productsRoutes');
const salesRoute = require('./routes/salesRoutes');
const { errorMiddleware } = require('./middlewares');

const app = express();

app.use(express.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoute);

app.use('/sales', salesRoute);

app.use(errorMiddleware);

app.listen(PORT, () => { console.log(`Online on port ${PORT}`); });