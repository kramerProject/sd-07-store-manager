const express = require('express');

const router = require('./routes');
const { errorMiddleware } = require('./middlewares');
const { PORT } = require('./CODE_ERROR');

const app = express();

app.use(express.json());
app.use(router);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(errorMiddleware);

app.listen(PORT, () => console.log('Online'));
