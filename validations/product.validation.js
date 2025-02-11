import Joi from "joi"

export function productValidation(data) {
    const productSchema = Joi.object({
        name_uz: Joi.string().required().min(2),
        name_ru: Joi.string().required().min(2),
        brand_id: Joi.number().required().positive(),
        country_id: Joi.number().required().positive(),
        price: Joi.number().positive().required(),
        old_price: Joi.number().positive().required(),
        available: Joi.string().required(),
        decription_uz: Joi.string().min(3).required(),
        decription_ru: Joi.string().min(3).required(),
        categoriesID: Joi.string().required(),
        washable: Joi.string().required(),
        size: Joi.string().required()
    })
    return productSchema.validate(data, { abortEarly: true })
}