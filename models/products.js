const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  // stock: { type: String, required: true },
  // description: { type: String },
  // createdAt: { type: Date, default: Date.now },
});

module.exports.Product = model("Product", productSchema);
