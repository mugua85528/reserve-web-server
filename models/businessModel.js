const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const businessUser = new Schema({
  userName: {
    type: String,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 255,
  },
  shopName: {
    type: String,
  },
  description: {
    type: String,
    maxlength: 30,
  },
  address: {
    type: String,
  },
  openTime: {
    type: Number,
  },
  closeTime: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  service: [
    {
      name: String,
      price: Number,
    },
  ],
});

businessUser.methods.comparePassword = async function (password, cb) {
  try {
    let result = await bcrypt.compare(password, this.password);
    return cb(null, result);
  } catch (e) {
    return cb(e, result);
  }
};

businessUser.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const hashValue = await bcrypt.hash(this.password, 10);
    this.password = hashValue;
  }
  next();
});

module.exports = mongoose.model("BusinessUser", businessUser);
