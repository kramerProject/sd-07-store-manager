const express = require('express');
const { productRoutes } = require('./routes');

const app = express();
const PORT = '3000';

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(productRoutes);

app.listen(PORT, () => { console.log('Online'); });
