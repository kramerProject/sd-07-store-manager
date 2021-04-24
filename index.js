const express = require('express');
const { creatProduct } = require('./src/routes');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send('Deu ruim');
});

app.use(creatProduct);

app.use((err, _req, res, _next) => {
  const { status, message, code } = err;
  res.status(status).json({
    error: {
      code,
      message,
    },
  });
});

app.listen(PORT, () => console.log('O pai tá on!'));
