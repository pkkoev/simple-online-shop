const productRouter = require("express").Router();
const productController = require("./controller.js");

productRouter.get("/", productController.getProducts);

productRouter.post("/", productController.createProduct);

productRouter.get("/:productId", productController.getProduct);

productRouter.put("/:productId", productController.updateProduct);

productRouter.post("/:productId", productController.deleteProduct);

module.exports = productRouter;