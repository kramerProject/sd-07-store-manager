const express = require("express");
const routes = require('./routes');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use(routes.productRoutes);

app.listen(3000, () => {
	console.log("Ouvindo a porta 3000!");
});

