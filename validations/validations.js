import joi from 'joi';

const brandsSchema = joi.object({
    name_uz: joi.string().required(),
    name_ru: joi.string().required(),
});

const countrySchema = joi.object({
    name_uz: joi.string(),
    name_ru: joi.string()
});

const categorySchema = joi.object({
    name_uz: joi.string().required(),
    name_ru: joi.string().required(),
});

const categoryItemSchema = joi.object({
    category_id: joi.number().required(),
    product_id: joi.number().required()
});

export { brandsSchema, countrySchema, categoryItemSchema, categorySchema }