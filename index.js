const express = require('express');
const { productRouter, saleRouter } = require('./router');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);
app.use('/sales', saleRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at port ${ PORT }`));
