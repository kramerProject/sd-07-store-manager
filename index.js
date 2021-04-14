// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const productRouter = require('./routers/productRouter');
const app = express();
const port = 3000;

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use('/products', productRouter);

app.listen(port, () => console.log('Example app listening on port port!'));
