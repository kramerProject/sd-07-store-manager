const express = require('express');
const productsController = require('./src/controller/products');
/* const salesController = require('./src/controller/sales'); */
const app = express();

app.use(express.json());

const ok = 200;

/* não remova esse endpoint, é para o avaliador funcionar */
app.get('/', (_req, res) => {
  res.status(ok).send(
    {
      message: 'Só para voce saber amigo, ta logado; server ok',
    },
  );
});

app.use('/products', productsController);
/* app.use('/sales', salesController); */

app.listen('3000', () => console.log('ta on'));
