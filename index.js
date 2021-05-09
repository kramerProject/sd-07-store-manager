const express = require('express');
const routes = require('./routes');

const port = 3000;

const app = express();


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use(routes.productRoute);

app.listen(port, () => {
  console.log(`Conexão estabalecida com a porta ${port}!`);
});
