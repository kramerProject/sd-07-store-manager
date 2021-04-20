const express = require('express');
const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');
const logMiddleware = require('./middlewares/logMiddleware');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// middlewares
app.use(logMiddleware);

// routers
app.use(productsRouter);
app.use(salesRouter);

app.listen('3000', () => console.log('Rodando na porta 3000'));
