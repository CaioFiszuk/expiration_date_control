//const Product = require('../models/Product.js');
const ExpiredProduct = require('../models/expiredProduct');

/*module.exports.moveExpiredProducts = async () => {
  try {
    const today = new Date();

    // Buscar produtos vencidos
    const expiredProducts = await Product.find({ expirationDate: { $lt: today } });

    if (expiredProducts.length > 0) {
      // Mover cada produto para a coleção de expirados
      await ExpiredProduct.insertMany(expiredProducts);

      // Remover os produtos vencidos da coleção original
      await Product.deleteMany({ expirationDate: { $lt: today } });

      console.log(`${expiredProducts.length} produtos movidos para expirados.`);
    }
  } catch (error) {
    console.error('Erro ao mover produtos expirados:', error);
  }
};*/

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