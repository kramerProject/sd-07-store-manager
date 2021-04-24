const express = require('express');

const app = express();

const PORT = process.env.PORT || '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use((err, _req, res, _next) => {
  const { status, message } = err;
  res.status(status).send({ message });
});

app.listen(PORT, () => console.log('O pai tá on!'));
