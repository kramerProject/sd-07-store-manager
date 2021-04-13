

const status = {
  add: 201,
  serverError: 500,
};

const addProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productModel.add(name, quantity);
    res.status(status.add).json(newPerson);
  } catch (error) {
    console.error(error.message);
    res.status(status.serverError).json({ message: error.message });
  }
};
