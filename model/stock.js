const mongoose = require ('mongoose');

const stockSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  productName: String,
  price: Number,
  quantity: Number,
  modificationDate: String,
  stockStatus: String
});

module.exports = mongoose.model('Stock', stockSchema);
