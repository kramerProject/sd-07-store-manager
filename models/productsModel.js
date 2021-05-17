const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllProducts = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray());
};

const createProduct = async (name, quantity) => {
  const prod = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return { _id: prod.insertedId, name, quantity };
};

const productById = async (id) => {
  // if(!ObjectId.isValid(id)) return null
  const productData = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));
  if(!productData) return null; // {
  return productData;
};

const updateProduct = async(id, name, quantity) => {
  await connection()
    .then((db) => db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity }}));
  return { _id: id, name, quantity };
};

/*
crush.put('/:id',
  authMiddleware,
  nameMiddleware,
  ageAuthMiddleware,
  dateAuthMiddleware,
  datedAtMiddle,
  rateMiddle, async (req, res) => {
  const result = await readCrushesFile();
  const { id } = req.params;
  const { name, age, date } = req.body;
  const crushIndex = result
    .findIndex((crushData) => crushData.id === Number(id));
  result[crushIndex] = { id: Number(id), name, age, date };
  try {
    await writeCrushesFile(result);
    return res.status(SUCCESS).send(result[crushIndex]);
  } catch (err) {
    const message = {
      message: 'Crush não encontrado',
    };
    return res.status(NOT_FOUND).send(message);
  }
});
*/

// const findProductByName = async (name) => {
//   const productsData = await connection()
//     .then((db) => db.collection('products').findOne({name}));

//   if(!productsData) return null;

//   const { name, quantity } = productsData;

//   return getNewProduct({ id, name, quantity });
// }

module.exports = {
  getAllProducts,
  createProduct,
  productById,
  updateProduct,
  // findProductByName,
};
