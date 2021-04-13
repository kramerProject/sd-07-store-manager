const serviceValidadeProduct = require('../service/serviceValidadeProduct');

function addProduct(req, res) {
  console.log('Dentro Controller');
  try {
    const { name, quantity } = req.body;
    console.log('ANTES SERVICE');
    const newProduct = serviceValidadeProduct(name, quantity);
    console.log('Depois SERVICE');
    return res.status(201).json(newProduct);
  } catch (err) {
    console.error(err.code, err.message);
    return res.status(500).json({ message: err.message });
  }
}

// async function getProducts (req, res) {
//   try {
//     const products = await ProductsModel.getAllProducts();
//     res.status(200).json(products);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: err.message });
//   }
// };

// async function getProductById (req, res) {
//   try {
//     const { id } = req.params;

//     const result = await ProductsModel.getById(id);

//     if (!result) {
//       return res.status(404).json({ message: 'Pessoa não encontrada :(' });
//     }

//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json({ message: err.message, code: err.code });
//   }
// };

// async function updateProduct (req, res) {
//   try {
//     const { name, quantity } = req.body;
//     const { id } = req.params;

//     const people = await ProductsModel.update(id, name, quantity);

//     res.status(200).json(people);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: err.message });
//   }
// };

// const deleteProduct = async (req, res) => {
//   try {
//     await ProductsModel.exclude(req.params.id);

//     res.status(204).end();
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: err.message });
//   }
// };

module.exports = {
  addProduct,
  // getProducts,
  // getProductById,
  // updateProduct,
  // deleteProduct,
};
