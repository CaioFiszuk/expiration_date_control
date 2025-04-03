const ExpiredProduct = require('../models/expiredProduct');

module.exports.getExpiredProducts = (req, res) => {
  ExpiredProduct.find({})
  .then((expiredProduct) => res.send({ data: expiredProduct }))
  .catch((err) =>
   res.status(500).send({ message: "Não foi possível retornar as informações" })
 );
}

module.exports.deleteExpiredProduct = (req, res) => {
  const { expiredProductId } = req.params;

  ExpiredProduct.findByIdAndDelete(expiredProductId)
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