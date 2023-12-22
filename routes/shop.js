const router = require("express").Router();
const shopDataValidation = require("../validation").shopDataValidation;
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
// const ShopData = require("../models/shopData");
const BusinessUser = require("../models/businessModel");

router.use((req, res, next) => {
  console.log("shop route ind...");
  next();
});

router.get("/", async (req, res) => {
  try {
    let dataFound = await BusinessUser.find({}).exec();
    return res.send(dataFound);
  } catch (e) {
    console.log(e);
    return res.status(500).send("無法查詢資料庫，請洽開發人員");
  }
});

router.post("/register", async (req, res) => {
  let { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailFound = await BusinessUser.findOne({ email: req.body.email });
  if (emailFound)
    return res.status(400).send("此信箱已註冊，更換信箱或利用此信箱登入");

  let { username, email, password } = req.body;
  let newUser = new BusinessUser({ username, email, password });
  try {
    let savedUser = await newUser.save();
    return res.send({
      msg: "新增成功",
      savedUser,
    });
  } catch (e) {
    return res.status(500).send("無法新增，請聯繫開發人員");
  }
});

router.post("/login", async (req, res) => {
  let { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const foundUser = await BusinessUser.findOne({ email: req.body.email });
  if (!foundUser) return res.status(401).send("信箱或密碼錯誤");

  foundUser.comparePassword(req.body.password, (err, isMatch) => {
    if (err) return res.status(500).send(err);

    if (isMatch) {
      return res.send({
        msg: "登入成功",
        user: foundUser,
      });
    } else {
      return res.status(401).send("信箱或密碼錯誤");
    }
  });
});

// router.post("/setting", async (req, res) => {
//   let { error } = shopDataValidation(req.body);
//   if (error) {
//     return res.status(400).send(error.details[0].message);
//   }

//   let { shopName, startTime, endTime } = req.body;
//   let newShop = new BusinessUser({
//     shopName,
//     startTime,
//     endTime,
//   });
//   try {
//     let savedShop = await newShop.save();
//     return res.send({
//       msg: "設定完成!",
//       savedShop,
//     });
//   } catch (e) {
//     console.log(e);
//     return res.status(500).send("無法儲存設定，請洽開發人員");
//   }
// });

router.patch("/:_id", async (req, res) => {
  let { error } = shopDataValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let { _id } = req.params;
  try {
    let shopFound = await BusinessUser.findOne({ _id });
    if (!shopFound) {
      return res.status(400).send("找不到此商店。無法更新資訊");
    } else {
      let updateShop = await BusinessUser.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
      });
      return res.send({
        msg: "商店資訊更新成功!",
        shopData: updateShop,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("無法更新，請洽開發人員");
  }
});

module.exports = router;
