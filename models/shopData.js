const { string } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const shopData = new Schema({
  shopName: {
    type: String,
    required: true,
  },
  startTime: {
    type: Number,
    required: true,
  },
  endTime: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("ShopData", shopData);
