import Joi from 'joi';


const orderDetailId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const clientId = Joi.number().integer();
const quantity = Joi.number().integer();
const price = Joi.number().precision(2);

export const createOrderDetailSchema = Joi.object({
  products: Joi.array()
    .items(
      Joi.object({
        productId: productId.required(),
        quantity: quantity.required(),
        })
    )
    .min(1)
    .required(),
  clientId: clientId.required(),
});

export const updateOrderDetailSchema = Joi.object({
  orderId: orderId, //temporal
  productId: productId,
  price: price,
  quantity: quantity,
});

export const getOrderDetailSchema = Joi.object({
  orderDetailId: orderDetailId.required(),
});