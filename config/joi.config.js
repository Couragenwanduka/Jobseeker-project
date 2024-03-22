import joi from 'joi';
import Joi from 'joi';

export const joiSchema= joi.object({
    name:joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required(),
    phonenumber:Joi.string().required(),
    companyname:Joi.string().required(),
})

export const joiJobSchema= joi.object({
    email:Joi.string().email().required(),
    title:Joi.string().required(),
    location:Joi.string().required(),
    description:Joi.string().required(),
});

export  const joiUserSchema= joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required(),
    firstname:Joi.string().required(),
    lastname:Joi.string().required(),
    phonenumber:Joi.string().required(),

});
export const joivalidationSchema= joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required(),
});

