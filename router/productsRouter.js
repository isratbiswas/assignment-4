const express = require("express");
const { Product } = require("../models/products");
const productsRouter = express.Router();

// CURD Operation to mogodb using mongoose

// Get all products
productsRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single product by id
productsRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).json({
      message: "Product not found",
    });
  res.status(200).json(product);
});

// Create new Product
productsRouter.post("/", async (req, res) => {
  try {
    const product = await Product.insertOne(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Update product
productsRouter.put("/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json(product);
});

// Delete product
productsRouter.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "Product deleted successfully",
  });
});
module.exports = productsRouter;
