const Product = require("./model.js");

const getProducts = async (req, res)  => {
  try {
    const products = await Product.find({});
    // const response = {items: products, currentPage: 1, totalPages: 1 + Math.floor(products.length / 20)} 
    res.status(200).send(products);
  } catch (err) {
    return res.status(400).send({err: err.toString()});
  }
}

const createProduct = async (req, res) => {
  try {
    let product = new Product(req.body);
    product = await product.save();

    res
      .status(201)
      .location(`/products/${product._id}`)
      .send();
  } catch (err) {
    return res.status(400).send({err: err.toString()});
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).send({message: "Product not found!"});
    }

    res.status(200).send(product);
  } catch (err) {
    return res.status(400).send({err: err.toString()});
  }
};

const updateProduct = async (req, res) => {
  try {
    const {title, imagePath, description,price} = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      {$set: {title, imagePath, description, price}},
      {new: true, runValidators: true}
    );

    if (!product) {
      return res.status(404).send({message: "Product not found!"});
    }

    res.status(200).send(product);
  } catch (err) {
    return res.status(400).send({err: err.toString()});
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.productId);

    if (!product) {
      return res.status(404).send({message: "Product not found!"});
    }

    res.status(204).send();
  } catch (err) {
    return res.status(400).send({err: err.toString()});
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
};