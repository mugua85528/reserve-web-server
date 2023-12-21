const Joi = require("joi");

const reverseValidation = (data) => {
  const schema = Joi.object({
    year: Joi.number().required(),
    month: Joi.number().required(),
    date: Joi.number().required(),
    day: Joi.string().required(),
    time: Joi.string().required(),
    ms: Joi.number().required(),
    service: Joi.string().required(),
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
    email: Joi.string(),
    textarea: Joi.string(),
    terms: Joi.boolean().required().invalid(false).messages({
      "any.invalid": "商家條款必須勾選",
    }),
  });
  return schema.validate(data);
};
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};
const shopDataValidation = (data) => {
  const schema = Joi.object({
    shopName: Joi.string().max(20).required(),
    startTime: Joi.number().required(),
    endTime: Joi.number().required(),
  });
  return schema.validate(data);
};

module.exports.reverseValidation = reverseValidation;
module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
module.exports.shopDataValidation = shopDataValidation;
