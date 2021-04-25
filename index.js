require('dotenv').config();
const express = require('express');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(router);

app.get('/', (request, response) => {
  response.send();
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
