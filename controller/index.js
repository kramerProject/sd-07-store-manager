const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

const SUCESS = 200;
const FAIL = 500;

const controller = async (req, res) => {
  try {
    const result = await connection()
      .then((db) => db.collection('products').find().toArray());
    res.status(SUCESS).json(result);
  } catch (error) {
    console.error(error);
    res.status(FAIL).json({ menssage: error.menssage });
  }
};

module.exports = controller;
