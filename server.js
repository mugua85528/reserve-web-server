const express = require("express");
const app = express();
const mongoose = require("mongoose");
const reserveRoute = require("./routes/reserve");
const shopRoute = require("./routes/shop");
const cors = require("cors");
const port = process.env.PORT || 8080;
// ("mongodb://127.0.0.1:27017/mernDB");
// process.env.MONGODB_CONNECTION
mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("reserveDB ing...");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", reserveRoute);
app.use("/api/shop", shopRoute);

app.listen(port, () => {
  console.log("back-server in port 8080...");
});
