const express = require('express');

const { productRoute, salesRoute } = require('./controllers');

const errorMiddleware = require('./middlewares/errorMiddleware');
const logMiddleWare = require('./middlewares/logMiddleWare');

const app = express();
const port = 3000;

app.use(express.json());

app.use(logMiddleWare);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRoute);

app.use('/sales', salesRoute);

app.use(errorMiddleware);

app.listen(port, () => console.log('Rodando na porta ' + port));
