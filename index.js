const express = require('express');
const dotenv = require('dotenv');

const app = express();
const port = 3000;

dotenv.config();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// app.use('/products', ProductsRouter);
// app.use('sales', SalesRouter);

app.get('/teste', (_req, res) => res.send('Hello Project'));
app.listen(port, () => console.log(`MyStoreApp active and listening on port ${port}`));
