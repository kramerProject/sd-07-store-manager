const express = require('express');
const storeControllers = require('./src/controllers/storeControllers');
const salesControllers = require('./src/controllers/salesControllers');
const errorTreat = require('./src/helpers/errorTreat');

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', storeControllers);
app.use('/sales', salesControllers);

app.use(errorTreat);

app.listen(PORT, () => console.log('Online'));
