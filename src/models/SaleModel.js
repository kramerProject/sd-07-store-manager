const { ObjectId } = require('mongodb');
const conn = require('../../helpers/conn');

const createSale = async(sales) => {
  return (
    conn().then(async (db) => {
      const newSale = await db.collection('sales').insertOne({ itensSold: sales });      
      return newSale.ops[0];
    })
  );    
};

// const getSaleByName = async(name) => {
//   return (
//     conn().then(async (db) => {
//       const productExist = await db.collection('products').findOne({ name: name });
//       return productExist;
//     })
//   );
// };

const getAllSales = async() => {
  return (
    conn().then(async (db) => {
      const allSales = await db.collection('sales').find().toArray();
      return allSales;
    })
  );
};

const getSaleById = async(id) => {
  return(
    conn().then(async(db) => {
      if (!ObjectId.isValid(id)) return null;
      const saleById = await db.collection('sales').findOne({ _id: ObjectId(id)});
      return saleById;
    })
  );
};

const updateSale = async(id, productId, quantity) => {
  return (
    conn().then(async (db) => {
      const updatedSale = await db.collection('sales')
        .updateOne({_id: ObjectId(id)}, {$set: {productId, quantity}});
      return  { _id: id, productId, quantity };
    })
  ); 
};

const deleteSale = async(id) => {
  return(
    conn().then(async (db) => {            
      const deletedSale = await getSaleById(id);
      if(!deletedSale) return null;
      await db.collection('sales').deleteOne({_id: ObjectId(id)});
      return deletedSale;
    })
  );
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale
};