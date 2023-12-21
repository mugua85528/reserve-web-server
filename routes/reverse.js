const router = require("express").Router();
const reverseValidation = require("../validation").reverseValidation;
const ReverseData = require("../models/reverseData");

router.use((req, res, next) => {
  console.log("reverse route ind...");
  next();
});

router.get("/", async (req, res) => {
  try {
    let reverseFound = await ReverseData.find({}).exec();
    return res.send(reverseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/search/:phoneNumber", async (req, res) => {
  try {
    let dateNow = new Date();
    let { phoneNumber } = req.params;
    let reverseFound = await ReverseData.find({
      phone: phoneNumber,
      ms: { $gte: dateNow.getTime() },
    }).exec();
    return res.send(reverseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("/reverse", async (req, res) => {
  let { error } = reverseValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let {
    year,
    month,
    date,
    day,
    time,
    ms,
    service,
    name,
    phone,
    gender,
    email,
    textarea,
    terms,
  } = req.body;
  let newReverse = new ReverseData({
    year,
    month,
    date,
    day,
    time,
    ms,
    service,
    name,
    phone,
    gender,
    email,
    textarea,
    terms,
  });
  try {
    let savedReverse = await newReverse.save();
    return res.send({
      msg: "預約成功!",
      savedReverse,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("無法預約，請聯繫店家或開發人員");
  }
});

router.delete("/delete/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let reverseFound = await ReverseData.findOneAndDelete({ _id }).exec();
    return res.send({
      msg: "刪除成功",
      reverseFound,
    });
  } catch (e) {
    return res.status(500).send("無法刪除");
  }
});

module.exports = router;
