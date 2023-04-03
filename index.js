import ProductManager from "./managers/ProductManager.js";

const manager = new ProductManager("./files/Products.json");

const getProducts = async () => {
  const products = await manager.getProducts();
  console.log(products);
};

const addProduct = async (
  title,
  description,
  price,
  thumbnail,
  code,
  stock
) => {
  const product = {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
  };
  await manager.addProduct(product);
};





console.log(await manager.getProducts())

await addProduct('Producto 1', 'Descripcion 1', 12000, 'Imagen 1', 'A1', 230)
await addProduct('Producto 2', 'Descripcion 2', 12000, 'Imagen 2', 'A2', 230)

console.log(await manager.getProducts())

console.log(await manager.getProductById(1))

await manager.updateProduct(1, { price: 25000, thumbnail:'Update thumbnail 1', code: 'abc987', stock: 1200})

console.log(await manager.getProducts())

await manager.deleteProduct(1)

console.log(await manager.getProducts())

















// getProducts()

// addProduct('Producto 2', 'Descripcion 2', 12000, 'Imagen 2', 'A2', 230)

// addProduct('Producto 3', 'Descripcion 3', 12000, 'Imagen 3', '3', 230)


// getProducts()
// getProducts()

// deleteProduct(1)
// getProducts()
// getProductById(1)

// addProduct('Producto 1', 'Descripcion 1', 12000, 'Imagen 1', 'A1', 230)







