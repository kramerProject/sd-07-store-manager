const express = require('express');
const { products, sales } = require('./src/routes');

const app = express();

app.use(express.json());

const LOCAL_PORT = 3000;
const PORT = process.env.PORT || LOCAL_PORT;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(products.getAllProducts);
app.use(products.creatProduct);
app.use(products.deletProduct);
app.use(sales.deletSale);
app.use(sales.updateSale);
app.use(sales.creatSale);
app.use(sales.getAllSales);

app.use((err, _req, res, _next) => {
  const { status, message, code } = err;
  res.status(status).json({
    err: {
      code,
      message,
    },
  });
});

app.listen(PORT, () => console.log('O pai tá on!'));
