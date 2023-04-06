import express from "express";
import ProductManager from "./managers/ProductManager.js";

const manager = new ProductManager("./files/Products.json");

const app = express();

const products = await manager.getProducts();
const error = {
  error: 'El producto es inexistente'
}

app.get("/saludo", (req, res) => {
  res.send("Hola a todos pero ahora desde express update");
});

app.get("/products", (req, res) => {
  const { limit } = req.query;
  if (limit) {
    const limitedProducts = products.slice(0, limit)
    res.send(limitedProducts)
  } else {
    res.send(products);
  }
});

app.get("/products/:pid", (req, res) => {
  const productId = Number(req.params.pid);
  const product = products.find((p) => p.id === productId);
  if (!product) {
    res.send(error);
  } else {
    res.send(product);

  }

});

app.listen(8080, () => console.log("Listening on port 8080"));
