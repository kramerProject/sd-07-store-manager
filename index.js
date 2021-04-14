const express = require('express');
const app = express();
const PORT = '3000';
app.use(express.json());
const controllerProducts = require('./controller/controllerProducts');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', controllerProducts.addProduct);


app.listen(PORT, () => { console.log('Online'); });