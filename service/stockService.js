const Stock = require("../model/stock.js");
const mongoose = require("mongoose");
module.exports = function() {

  return {
    addNewStock(json) {
        var newStock = new Stock({
          id: new mongoose.Types.ObjectId(),
          productName: json.productName,
          quantity: json.quantity,
          price: json.price,
          modificationDate: json.modificationDate,
          stockStatus: json.stockStatus
        });
        newStock.save(function(err){
          if(err) console.log("Error at saving new stock: " +err);
        });
        return newStock;
    },
    updateStock(json, callback) {
      Stock.findOneAndUpdate({id: json.id}, json, {}, callback);
        return json;
    },
    getStock(callback) {
      Stock.find({}).exec(callback);
    }
  }
};
