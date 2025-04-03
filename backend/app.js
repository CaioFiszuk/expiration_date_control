const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const productsRoutes = require('./routes/products');
const expiredProductsRoutes = require('./routes/expiredProducts');

app.use(cors());
app.options('*', cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/expControl")
.then(()=>{
  console.log("Database is successfully connected");
});

app.use('/products', productsRoutes);
app.use('/expiredProducts', expiredProductsRoutes)

app.use((err, req, res, next) => {
   console.log("err:" + err)

  res.status(err.statusCode).send({ message: err.message });
});

app.listen(3000, () => console.log(`O servidor está rodando`));