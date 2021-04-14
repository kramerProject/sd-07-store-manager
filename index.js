const express = require('express');
const productsRoute = require('./src/routes/productsRoute');

const PORT = 3000;
const app = express();

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(productsRoute);

app.listen(PORT, () => { console.log('Online'); });
