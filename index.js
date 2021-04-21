const express = require('express');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', (req, res) => {

})

app.listen(3000, () => {
  console.log('App rodando na porta 3000');
})