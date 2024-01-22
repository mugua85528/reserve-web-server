const Joi = require("joi");

const reserveValidation = (data) => {
  const schema = Joi.object({
    year: Joi.number().required(),
    month: Joi.number().required(),
    date: Joi.number().required(),
    day: Joi.string().required(),
    time: Joi.string().required(),
    ms: Joi.number().required(),
    service: Joi.string().required(),
    price: Joi.number().required(),
    name: Joi.string().required().messages({
      "string.base": `姓名必須填寫`,
      "string.empty": `姓名必須填寫`,
      "any.required": `姓名必須填寫`,
    }),
    phone: Joi.number().min(900000000).max(999999999).required().messages({
      "number.base": `手機號碼必須填寫`,
      "number.empty": `手機號碼必須填寫`,
      "number.min": `手機號碼必須是10碼`,
      "number.max": `手機號碼必須是10碼`,
      "any.required": `手機號碼必須填寫`,
    }),
    gender: Joi.required(),
    email: Joi.string().allow(null, ""),
    textarea: Joi.string().allow(null, ""),
    terms: Joi.boolean().required().invalid(false).messages({
      "any.invalid": "商家條款必須勾選",
    }),
  });
  return schema.validate(data);
};
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email().messages({
      "string.base": `信箱必須填寫`,
      "string.empty": `信箱必須填寫`,
      "string.email": `信箱必須為有效信箱`,
      "any.required": `信箱必須填寫`,
    }),
    password: Joi.string().min(6).max(255).required().messages({
      "string.base": `密碼必須填寫`,
      "string.empty": `密碼必須填寫`,
      "string.min": `密碼必須大於6個英數字`,
      "string.max": `密碼必須小於255個英數字`,
      "any.required": `密碼必須填寫`,
    }),
  });
  return schema.validate(data);
};
const registerValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().max(20).required().messages({
      "string.base": `名稱必須填寫`,
      "string.empty": `名稱必須填寫`,
      "string.max": `名稱必須小於20個字`,
      "any.required": `名稱必須填寫`,
    }),
    email: Joi.string().required().email().messages({
      "string.base": `信箱必須填寫`,
      "string.empty": `信箱必須填寫`,
      "string.email": `信箱必須為有效信箱`,
      "any.required": `信箱必須填寫`,
    }),
    password: Joi.string().min(6).max(255).required().messages({
      "string.base": `密碼必須填寫`,
      "string.empty": `密碼必須填寫`,
      "string.min": `密碼必須大於6個英數字`,
      "string.max": `密碼必須小於255個英數字`,
      "any.required": `密碼必須填寫`,
    }),
  });
  return schema.validate(data);
};
const shopDataValidation = (data) => {
  const schema = Joi.object({
    shopName: Joi.string().max(20).required().messages({
      "string.base": `名稱必須填寫`,
      "string.empty": `名稱必須填寫`,
      "string.max": `名稱必須小於20個字`,
      "any.required": `名稱必須填寫`,
    }),
    description: Joi.string().max(30).required().messages({
      "string.base": `簡介必須填寫`,
      "string.empty": `簡介必須填寫`,
      "string.max": `簡介不得超過30個字`,
      "any.required": `簡介必須填寫`,
    }),
    address: Joi.string().required(),
    openTime: Joi.number().min(0).max(24).required().messages({
      "number.base": `開始營業時間必須填寫`,
      "number.empty": `開始營業時間必須填寫`,
      "number.min": `開始營業時間必須為0~24之間的整數`,
      "number.max": `開始營業時間必須為0~24之間的整數`,
      "any.required": `開始營業時間必須填寫`,
    }),
    closeTime: Joi.number().min(0).max(24).required().messages({
      "number.base": `結束營業時間必須填寫`,
      "number.empty": `結束營業時間必須填寫`,
      "number.min": `結束營業時間必須為0~24之間的整數`,
      "number.max": `結束營業時間必須為0~24之間的整數`,
      "any.required": `結束營業時間必須填寫`,
    }),
  });
  return schema.validate(data);
};

module.exports.reserveValidation = reserveValidation;
module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
module.exports.shopDataValidation = shopDataValidation;
