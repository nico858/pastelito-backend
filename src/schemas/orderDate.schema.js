import Joi from 'joi';


const orderId = Joi.number().integer();
const clientId = Joi.number().integer();
const dateOrder = Joi.string().isoDate(); //pendiente tipo dato fecha

export const createOrderDateSchema = Joi.object({
  orderId: orderId.required(),
  clientId: clientId.required(),
});

export const updateOrderDateSchema = Joi.object({
  orderId: orderId,
  clientId: clientId,
  dateOrder: dateOrder
});

export const getOrderDateSchema = Joi.object({
  orderId: orderId.required(),
});
