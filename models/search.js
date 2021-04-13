const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dbProject = require('./dbProject');
const { ObjectId } = require('mongodb');
const Status = require('../middleWare/Status');

const getAll = async (req, res, next) => {
  const collection = await dbProject.getAllProject();
  return res.status(Status.OK).send({ products: collection });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const collectionT = await dbProject.getAllProject();
  const collection = await dbProject.getById(id);
  console.log('id parametro:', id);
  // console.log('collectionT', collectionT);
  console.log('retorno getById:', collection);
  if (!collection) {
    console.log('true para !collection');
    return res.status(Status.Unprocessable_Entity).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  return res.status(Status.OK).send(collection[0]);
};

module.exports = {
  getAll,
  getById,
};
