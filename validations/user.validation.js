import Joi from "joi";

export function userValidation(data){
   let  userSchema= Joi.object({
        fullName:Joi.string().required().min(2).max(30),
        phone:Joi.string().required(),
        password:Joi.string().required().min(4).max(15),
        role:Joi.any().default("user")
    })
    return userSchema.validate(data,{abortEarly:false})
}