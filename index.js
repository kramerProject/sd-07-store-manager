const express = require('express');

const app = express();

const PORT = process.env.PORT || '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('O pai tá on!'));
