const express = require('express');

const productRoutes = require('./routes/productRoutes');
const salesRoutes = require('./routes/salesRoutes');

const app = express();

app.use(express.json());
app.use(productRoutes);
app.use(salesRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server: ON | Port: ${port}`);
});
