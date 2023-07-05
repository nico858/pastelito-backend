/**
 * @swagger
 * components:
 *  schemas:
 *   OrderDetail:
 *    type: object
 *    required:
 *      - orderDateId
 *      - productId
 *      - quantity
 *      - price
 *    properties:
 *      id:
 *        type: integer
 *        description: The auto-generated id of the orderDetail
 *      orderDateId:
 *        type: string
 *        description: The id of the orderDate
 *      productId:
 *        type: string
 *        description: The id of the product
 *      quantity:
 *        type: integer
 *        description: Amount of product
 *      price:
 *        type: integer
 *        description: The price of the order. Obtained from quantity * product price.
*/
/**
 * @swagger
 * tags:
 *   name: OrderDetail
 *   description: The order managing API
 * /orderDetail:
 *   get:
 *     summary: Lists all the order
 *     tags: [OrderDetail]
 *     responses:
 *       200:
 *         description: The list of the orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderDetail'
 *   post:
 *     summary: Create a new order
 *     tags: [OrderDetail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderDetail'
 *     responses:
 *       200:
 *         description: The created order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDetail'
 *       500:
 *         description: Server error
 * /orderDetail/{id}:
 *   get:
 *     summary: Get the order by id
 *     tags: [OrderDetail]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *     responses:
 *       200:
 *         description: The order response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDetail'
 *       404:
 *         description: The order was not found
 *   patch:
 *    summary: Update the order by the id
 *    tags: [OrderDetail]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The order id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/OrderDetail'
 *    responses:
 *      200:
 *        description: The order was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/OrderDetail'
 *      404:
 *        description: The order was not found
 *      500:
 *        description: Server error
 *   delete:
 *     summary: Remove the order by id
 *     tags: [OrderDetail]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *
 *     responses:
 *       200:
 *         description: The order was deleted
 *       404:
 *         description: The order was not found
 */


import express from 'express';

import OrderDatailService from './../services/orderDetail.service.js';
import validatorHandler from './../middlewares/validator.handler.js';
import { updateOrderDetailSchema, createOrderDetailSchema, getOrderDetailSchema } from './../schemas/orderDetail.schema.js';

const router = express.Router();
const service = new OrderDatailService();



router.get('/', async (req, res, next) => {
  try {
    const orderDetail = await service.find();
    res.json(orderDetail);
  } catch (error) {
    next(error);
  }
});

router.get('/:orderDetailId',
  validatorHandler(getOrderDetailSchema, 'params'),
  async (req, res, next) => {
    try {
      const { orderDetailId } = req.params;
      const orderDetail = await service.findOne(orderDetailId);
      res.json(orderDetail);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createOrderDetailSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { newOrderDetails, totalPrice } = await service.create(body);
      res.status(201).json({ newOrderDetails, totalPrice });
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:orderDetailId',
  validatorHandler(getOrderDetailSchema, 'params'),
  validatorHandler(updateOrderDetailSchema, 'body'),
  async (req, res, next) => {
    try {
      const { orderDetailId } = req.params;
      const body = req.body;
      const orderDetail = await service.update(orderDetailId, body);
      res.json(orderDetail);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:orderDetailId',
  validatorHandler(getOrderDetailSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(orderDetailId);
      res.status(201).json({orderDetailId});
    } catch (error) {
      next(error);
    }
  }
);

export default router;
