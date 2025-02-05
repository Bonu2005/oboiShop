import Joi from "joi";

export function orderItemValidation(data){
    const orderItemSchema = Joi.object({
        product_id: Joi.number().positive().required(),
        order_id: Joi.number().positive().required(), 
        total_count: Joi.number().positive().required(), 
        total_price: Joi.number().positive().required(),
    })
    return orderItemSchema.validate(data, {abortEarly: true})
}