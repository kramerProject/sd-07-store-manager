const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const validators = require('./validators');
const { ObjectId } = require('mongodb');
const Status = require('../middleWare/Status');
const validationsProducts = require('../middleWare/validationsProducts');
const connectionProject = require('./connectionProject');
app.use(express.json());
const zero = 0;

const sales = async (req, res, next) => {
  const data = req.body;
  console.log(data);
  const qtdIsValid =
    data.filter((e) => e.quantity <= zero).length <= zero &&
    data.filter((e) => typeof e.quantity === 'string').length <= zero;
  if (!qtdIsValid) {
    return res.status(Status.Unprocessable_Entity).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  const collection = await validators.getAllProject();
  console.log(collection);
  data.map((body) => {
    let valido = zero;
    collection.map((collection) => {
      if (body.productId.toString() === collection._id.toString()) {
        valido += 1;
      } 
    });
    if (valido === zero) {
      return res.status(Status.Unprocessable_Entity).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
    if (valido >= zero) {
      return res.status(Status.OK).json({
        itensSold: data,
      });
    }
  });

};

module.exports = sales;
