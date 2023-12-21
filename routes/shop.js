const router = require("express").Router();
const shopDataValidation = require("../validation").shopDataValidation;
const shopData = require("../models/shopData");
const ShopData = require("../models/shopData");

router.use((req, res, next) => {
  console.log("shop route ind...");
  next();
});

router.get("/", async (req, res) => {
  try {
    let dataFound = await ShopData.find({}).exec();
    return res.send(dataFound);
  } catch (e) {
    console.log(e);
    return res.status(500).send("無法查詢資料庫，請洽開發人員");
  }
});

router.post("/setting", async (req, res) => {
  let { error } = shopDataValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let { shopName, startTime, endTime } = req.body;
  let newShop = new ShopData({
    shopName,
    startTime,
    endTime,
  });
  try {
    let savedShop = await newShop.save();
    return res.send({
      msg: "設定完成!",
      savedShop,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("無法儲存設定，請洽開發人員");
  }
});

router.patch("/:_id", async (req, res) => {
  let { error } = shopDataValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let { _id } = req.params;
  try {
    let shopFound = await ShopData.findOne({ _id });
    if (!shopFound) {
      return res.status(400).send("找不到此商店。無法更新資訊");
    } else {
      let updateShop = await ShopData.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
      });
      return res.send({
        msg: "商店資訊更新成功!",
        updateShop,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("無法更新，請洽開發人員");
  }
});

module.exports = router;
