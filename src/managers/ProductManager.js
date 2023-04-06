import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  getProducts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(data);
        return products;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  addProduct = async (product) => {
    try {
      const products = await this.getProducts();

      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.code ||
        !product.stock
      ) {
        console.log(
          `Todos los campos son obligatorios, por favor ingresa de nuevo.`
        );
        return;
      }

      const codeControl = products.find((p) => p.code === product.code);
      if (codeControl) {
        console.error("No puede haber codes repetidos");
        return;
      } else {
        if (products.length === 0) {
          product.id = 1;
        } else {
          product.id = products[products.length - 1].id + 1;
        }
        products.push(product);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, "\t")
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  getProductById = async (searchId) => {
    const products = await this.getProducts();
    const productById = products.find((p) => p.id === searchId);
    if (!productById) {
      console.error("Product not found");
    } else {
      return productById;
    }
  };

  deleteProduct = async (deleteId) => {
    const products = await this.getProducts();
    const productByIndex = products.findIndex((p) => p.id === deleteId);
    if (productByIndex === -1) {
      console.error("Product not found");
    } else {
      products.splice(productByIndex, 1);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
    }
  };

  updateProduct = async (updateId, productUpdate) => {
    const products = await this.getProducts();
    const originalProductIndex = products.findIndex((p) => p.id === updateId);
    if (originalProductIndex === -1) {
      console.log("Product not found");
    } else {
      products[originalProductIndex] = {
        ...products[originalProductIndex],
        ...productUpdate,
      };
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
    }
  };
}
