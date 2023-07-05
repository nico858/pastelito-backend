import express from 'express';

import OrderDateService from './../services/orderDate.service.js';
import validatorHandler from './../middlewares/validator.handler.js';
import { updateOrderDateSchema, createOrderDateSchema, getOrderDateSchema } from './../schemas/orderDate.schema.js';

const router = express.Router();
const service = new OrderDateService();



router.get('/', async (req, res, next) => {
  try {
    const orderDates = await service.find();
    res.json(orderDates);
  } catch (error) {
    next(error);
  }
});

router.get('/:orderDateId',
  // validatorHandler(getOrderDateSchema, 'params'),
  async (req, res, next) => {
    try {
      const { orderDateId } = req.params;
      const orderDate = await service.findOne(orderDateId);
      res.json(orderDate);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/user/:userId',
  // validatorHandler(getOrderDateSchema, 'params'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const orderDate = await service.findByUser(userId);
      res.json(orderDate);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createOrderDateSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrderDate = await service.create(body);
      res.status(201).json(newOrderDate);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:orderDateId',
  validatorHandler(getOrderDateSchema, 'params'),
  validatorHandler(updateOrderDateSchema, 'body'),
  async (req, res, next) => {
    try {
      const { orderDateId } = req.params;
      const body = req.body;
      const orderDate = await service.update(orderDateId, body);
      res.json(orderDate);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:orderDateId',
  validatorHandler(getOrderDateSchema, 'params'),
  async (req, res, next) => {
    try {
      const { orderDateId } = req.params;
      await service.delete(orderDateId);
      res.status(201).json({orderDateId});
    } catch (error) {
      next(error);
    }
  }
);

export default router;
