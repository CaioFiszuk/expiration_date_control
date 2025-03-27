const express = require('express');
const mongoose = require("mongoose");
const app = express();
const productsRoutes = require('./routes/products');

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/expControl")
.then(()=>{
  console.log("Database is successfully connected");
});

app.use('/products', productsRoutes);

app.use((err, req, res, next) => {
   console.log("err:" + err)

  res.status(err.statusCode).send({ message: err.message });
});

app.listen(3000, () => console.log(`O servidor está rodando`));