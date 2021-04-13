const connection = require('../config/connection');

const insertProduct = async (name, quantity) => {
  try {
    const db = await connection();
    await db.collection('products').insertOne({
      name,
      quantity,
    });
  } catch (error) {
    console.error({ message: 'Sem conexão com o banco' });
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
};
