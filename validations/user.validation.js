const Joi = require("joi");

exports.userValidation = (data) => {
  const schemaUser = Joi.object({
    user_name: Joi.string().min(2).max(50).required().messages({
      "string.base": "Foydalanuvchi nomi matn turi bo'lishi kerak",
      "string.empty": "Foydalanuvchi nomi bo'sh bo'lishi kerak emas",
      "string.min": "Foydalanuvchi nomi kamida 2 harf bo'lishi kerak",
      "string.max": "Foydalanuvchi nomi 50 harfdan oshmasligi kerak",
      "any.required": "Foydalanuvchi nomi majburiy",
    }),
    user_email: Joi.string().email().required().messages({
      "string.email": "To'g'ri elektron pochta manzilini kiriting",
      "string.empty": "Elektron pochta manzili bo'sh bo'lmasligi kerak",
      "any.required": "Elektron pochta manzili majburiy",
    }),
    user_password: Joi.string().min(8).max(20).required().messages({
      "string.min": "Parol kamida 8 ta belgidan iborat bo'lishi kerak",
      "string.max": "Parol ko'pi bilan 20 ta belgidan iborat bo'lishi kerak",
      "string.empty": "Parol bo'sh bo'lmasligi kerak",
      "any.required": "Parol majburiy",
    }),
    user_info: Joi.string().allow(null, "").max(500).messages({
      "string.max":
        "Foydalanuvchi haqida ma'lumot 500 harfdan oshmasligi kerak",
    }),
    user_photo: Joi.string().allow(null, "").uri().messages({
      "string.uri": "Foydalanuvchi fotosi uchun to'g'ri URL manzil kiriting",
    }),
    user_is_active: Joi.boolean().messages({
      "boolean.base": "Foydalanuvchi holati to'g'ri bo'lishi kerak",
    }),
  });

  return schemaUser.validate(data, { abortEarly: false });
};
