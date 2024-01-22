const router = require("express").Router();
const reserveValidation = require("../validation").reserveValidation;
const ReserveData = require("../models/reserveData");

router.use((req, res, next) => {
  console.log("reserve route ind...");
  next();
});

router.get("/", async (req, res) => {
  try {
    let reserveFound = await ReserveData.find({}).exec();
    return res.send(reserveFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/after", async (req, res) => {
  try {
    let dateNow = new Date();
    let reserveFound = await ReserveData.find({
      ms: { $gte: dateNow.getTime() },
    }).exec();
    return res.send(reserveFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/search/:phone", async (req, res) => {
  try {
    let dateNow = new Date();
    let { phone } = req.params;
    let reserveFound = await ReserveData.find({
      phone: phone,
      ms: { $gte: dateNow.getTime() },
    }).exec();
    return res.send(reserveFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("/reserve", async (req, res) => {
  let { error } = reserveValidation(req.body);
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
    price,
    name,
    phone,
    gender,
    email,
    textarea,
    terms,
  } = req.body;
  let newReserve = new ReserveData({
    year,
    month,
    date,
    day,
    time,
    ms,
    service,
    price,
    name,
    phone,
    gender,
    email,
    textarea,
    terms,
  });
  try {
    let savedReserve = await newReserve.save();
    return res.send({
      msg: "預約成功!",
      savedReserve,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("無法預約，請聯繫店家或開發人員");
  }
});

router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;

  try {
    let reservedFound = await ReserveData.findOne({ _id });
    if (!reservedFound) {
      return res.status(400).send("查無此預約訂單");
    }

    let deletedFound = await ReserveData.findOneAndDelete({ _id }).exec();
    return res.send({
      msg: "刪除成功",
      deletedFound,
    });
  } catch (e) {
    return res.status(500).send("無法刪除");
  }
});

module.exports = router;
