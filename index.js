const express = require('express');
const routers = require('./router');

const app = express();

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(routers);

app.listen(PORT, () => { console.log(`Online, Ouvindo porta ${PORT}!`); });
