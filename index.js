const express = require('express');
const { router, route } = require('./routes');
const { errorMiddlewares } = require('./middlewares');
const { SUCCESS, PORT } = require('./CODE_ERROR');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(router);
app.use(route);

app.use(errorMiddlewares);

app.listen(PORT, () => console.log('Online'));
