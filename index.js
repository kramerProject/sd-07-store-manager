const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT);
