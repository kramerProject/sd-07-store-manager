const express = require('express');
const productsRoutes = require('./routes/productsRoutes');
const middlewares = require('./middlewares');

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(productsRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(middlewares.errorMiddleware);

app.listen(PORT, () => {
  console.log(`App "ouvindo" a porta ${PORT}.`);
});
