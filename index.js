const express = require('express');
const app = express();
const PORT = '3000';
const controllerProducts = require('./controller/controllerProducts');

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', controllerProducts.addProduct);


app.listen(PORT, () => { console.log('Online'); });