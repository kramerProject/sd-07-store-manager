const express = require('express');
const middleware = require('./src/middlewares');
const productRouter = require('./src/routers/productRouter');
const saleRouter = require('./src/routers/saleRouter');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(productRouter);
app.use(saleRouter);

app.use(middleware.errorMiddleware);

app.listen(PORT, () => {
  console.log(`Escutando na porta ${ PORT }`);
});
