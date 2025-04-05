const Product = require("../models/product");

module.exports.createProduct = (req, res) => {
  const { title, quantity, expirationDate } = req.body;

  if (!title || !quantity || !expirationDate) {
    return res.status(400).send({ message: "Todos os campos precisam ser preenchidos" });
  }

  Product.create({ title, quantity, expirationDate })
    .then((product) => res.send({ data: product }))
    .catch((err) =>
      res.status(500).send({ message: "It was not possible for create a product" + err })
    );
};

module.exports.getProducts = (req, res) => {
  Product.find({})
  .then((product) => res.send({ data: product }))
  .catch((err) =>
   res.status(500).send({ message: "Não foi possível retornar as informações" })
 );
}

module.exports.deleteProduct = (req, res) => {
  const { productId } = req.params;

  Product.findByIdAndDelete(productId)
    .then((deletedProduct) => {
      if (!deletedProduct) {
        return res.status(404).send({ message: "O produto não foi encontrado" });
      }
      res.send({ message: "Produto deletado", data: deletedProduct });
    })
    .catch((err) => {
      res.status(500).send({ message: "Server error" });
    });
};

module.exports.updateProduct = (req, res) => {
  Product.findByIdAndUpdate(
    req.params.productId,
    {
      title: req.body.title,
      quantity: req.body.quantity,
      expirationDate: req.body.expirationDate
    },
    {
      new: true,
      runValidators: true,
      upsert: false
    }
  )
  .then(product => res.send({ data: product }))
  .catch(err => res.status(500).send(err.message));
}
