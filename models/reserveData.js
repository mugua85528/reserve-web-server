const mongoose = require("mongoose");
const { Schema } = mongoose;

const reserveData = new Schema({
  year: {
    type: Number,
    require: true,
  },
  month: {
    type: Number,
    require: true,
  },
  date: {
    type: Number,
    require: true,
  },
  day: {
    type: String,
    require: true,
  },
  ms: {
    type: Number,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  service: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    maxLength: 50,
  },
  textarea: {
    type: String,
    maxLength: 50,
  },
  terms: {
    type: Boolean,
    require: true,
  },
});

module.exports = mongoose.model("ReverseData", reserveData);
