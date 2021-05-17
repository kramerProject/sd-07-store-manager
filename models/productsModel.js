const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getNewProduct = ({ id, name, quantity }) => {
  return {
    id,
    name,
    quantity,
  };
};

const createProduct = async (name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => getNewProduct({ id: result.insertedId, name, quantity }));
};

const getAllProducts = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => products.map(({ id, name, quantity }) =>
      getNewProduct({
        id,
        name,
        quantity,
      })
    )
    );
};

const productById = async (id) => {
  const productData = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));
  if(!productData) {
    return res.status(INVALID_DATA)
      .send({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        }
      });
  }
  const { name, quantity } = productData;
  return getNewProduct({ id, name, quantity });
};

// const findProductByName = async (name) => {
//   const productsData = await connection()
//     .then((db) => db.collection('products').findOne({name}));

//   if(!productsData) return null;

//   const { name, quantity } = productsData;

//   return getNewProduct({ id, name, quantity });
// }

module.exports = {
  getNewProduct,
  getAllProducts,
  createProduct,
  productById,
  // findProductByName,
};
