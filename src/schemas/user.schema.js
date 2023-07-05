import Joi from 'joi';

const id = Joi.number().integer();
const firstName = Joi.string().max(40);
const lastName = Joi.string().max(60);
const userPassword = Joi.string().min(8);
const email = Joi.string().email();
const phone = Joi.string().min(10).max(10);
const role = Joi.string().min(5);
const addressId = Joi.string();

const nomecature = Joi.string().min(10).max(40);
const detail = Joi.string().min(5).max(20);

export const createUserSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  userPassword: userPassword.required(),
  email: email.required(),
  phone: phone.required(),
  role: role,
  address: Joi.object({
    nomecature: nomecature.required(),
  })
});

export const updateUserSchema = Joi.object({
  firstName: firstName,
  lastName: lastName,
  email: email,
  phone: phone,
  role: role,
  addressId: addressId,
});

export const getUserSchema = Joi.object({
  id: id.required(),
});
