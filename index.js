const express = require('express');
const products = require('./src/routes');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(products.getAllProducts);
app.use(products.creatProduct);

app.use((err, _req, res, _next) => {
  const { status, message, code } = err;
  res.sendStatus(status).json({
    error: {
      code,
      message,
    },
  });
});

app.listen(PORT, () => console.log('O pai tá on!'));
