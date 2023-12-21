const express = require("express");
const app = express();
const mongoose = require("mongoose");
const reverseRoute = require("./routes/reverse");
const shopRoute = require("./routes/shop");
const cors = require("cors");
const port = process.env.PORT || 8080;

mongoose
  .connect(procee.env.MONGOBD_CONNECTION)
  .then(() => {
    console.log("reverseDB ing...");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", reverseRoute);
app.use("/api/shop", shopRoute);

app.listen(port, () => {
  console.log("back-server in port 8080...");
});
