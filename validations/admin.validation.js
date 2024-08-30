const Joi = require("joi");

exports.adminValidation = (data) => {
  const schemaAdmin = Joi.object({
    admin_name: Joi.string().min(2).max(50).required().messages({
      "string.base": "Admin nomi matn ko'rinishida bo'lishi kerak",
      "string.empty": "Admin nomi bo'sh bo'lishi kerak emas",
      "string.min": "Admin nomi kamida 2 harf bo'lishi kerak",
      "string.max": "Admin nomi 50 harfdan oshmasligi kerak",
      "any.required": "Admin nomi majburiy",
    }),
    admin_email: Joi.string().email().required().messages({
      "string.email": "To'g'ri elektron pochta manzilini kiriting",
      "string.empty": "Elektron pochta manzili bo'sh bo'lmasligi kerak",
      "any.required": "Elektron pochta manzili majburiy",
    }),
    admin_phone: Joi.string()
      .pattern(/^\+998-\d{2}-\d{3}-\d{2}-\d{2}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Telefon raqami +998-XX-XXX-XX-XX formatida bo'lishi kerak",
        "string.empty": "Telefon raqami bo'sh bo'lmasligi kerak",
        "any.required": "Telefon raqami majburiy",
      }),
    admin_password: Joi.string().min(8).max(20).required().messages({
      "string.min": "Parol kamida 8 ta belgidan iborat bo'lishi kerak",
      "string.max": "Parol ko'pi bilan 20 ta belgidan iborat bo'lishi kerak",
      "string.empty": "Parol bo'sh bo'lmasligi kerak",
      "any.required": "Parol majburiy",
    }),
    admin_is_active: Joi.boolean().default(false),
    admin_is_creator: Joi.boolean().default(false),
  });

  return schemaAdmin.validate(data, { abortEarly: false });
};
