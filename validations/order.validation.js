import Joi from "joi";

export function orderValidation(data){
    const orderSchema = Joi.object({
        user_id: Joi.number().positive().required(),
        total_price: Joi.number().positive().required(),
        products: Joi.array()
    })
    return orderSchema.validate(data);
}