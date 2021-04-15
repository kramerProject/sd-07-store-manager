const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(router);

app.listen(PORT, () => { console.log(`Online, Ouvindo porta ${PORT}!`); });
