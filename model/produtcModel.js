const connection = require('../config/connection');
const { ObjectID } = require('mongodb');

const insertProduct = async (name, quantity) => {
  try {
    const db = await connection();
    const product = await db.collection('products').insertOne({
      name,
      quantity,
    });
    return product;
  } catch (error) {
    console.error({ message: 'Sem conexão com o banco' });
  }
};

//https://mongodbwise.wordpress.com/2014/05/22/mongodb-guia-rapido/
const updateProduct = async (id, name, quantity) => {
  try {
    const query = {_id: ObjectID(id)};
    const update = {$set: {name, quantity}};
    const option = {returnOriginal: false};
    const db = await connection();
    const product = await db
      .collection('products')
      .findOneAndUpdate( query , update, option );
    return product;
  } catch (error) {
    console.error({
      message: 'Não tem produto com esse nome no banco',
    });
  }
};

const deleteProduct = async (id) => {
  try {
    const db = await connection();
    const product = await db
      .collection('products')
      .findOneAndDelete({ _id: ObjectID(id) });
    return product;
  } catch (error) {
    console.error({
      message: 'Não tem produto com esse nome no banco',
    });
  }
};

const showAllProducts = async () => {
  try {
    const db = await connection();
    const allProducts = await db.collection('products').find().toArray();
    return allProducts;
  } catch (error) {
    console.error({
      message: 'Não tem produto com esse nome no banco',
    });
  }
};

const showProductId = async (id) => {
  try {
    const db = await connection();
    const product = await db
      .collection('products')
      .findOne({ _id: ObjectID(id) });
    return product;
  } catch (error) {
    console.error({
      message: 'Não tem produto com esse nome no banco',
    });
  }
};

const findName = async (name) => {
  try {
    const db = await connection();
    const ObjectName = await db.collection('products').findOne({ name });
    //retorna o objeto todo que conter o nome
    return ObjectName.name;
  } catch (error) {
    console.error({
      message: 'Não tem produto com esse nome no banco, produto cadastrado com sucesso',
    });
  }
};

module.exports = {
  insertProduct,
  findName,
  showAllProducts,
  showProductId,
  deleteProduct,
  updateProduct,
};
