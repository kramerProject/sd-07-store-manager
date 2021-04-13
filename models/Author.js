// models/Author.js

const connection = require('./connection');

// Busca todos os autores do banco.
const getAll = async () => {
  return connection()
    .then((db) => db.collection('authors').find().toArray())
    .then((authors) => {return authors;});
};

module.exports = {
  getAll,
};
