// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const productRouter = require('./routers/productRouter');
const saleRouter = require('./routers/saleRouter');
const app = express();
const port = 3000;

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use('/products', productRouter);
app.use('/sales', saleRouter);


app.listen(port, () => console.log('Example app listening on port 3000!'));
