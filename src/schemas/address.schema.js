import Joi from 'joi';

const id = Joi.number().integer();
const userId = Joi.number().integer();
const nomecature = Joi.string().min(10).max(40);

export const createAddressSchema = Joi.object({
  userId: userId.required(),
  nomecature: nomecature.required(),
});

export const updateAddressSchema = Joi.object({
  nomecature: nomecature,
});

export const getAddressSchema = Joi.object({
  id: id.required(),
});
