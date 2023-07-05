/**
 * @swagger
 * components:
 *  schemas:
 *   Address:
 *    type: object
 *    required:
 *      - nomencature
 *      - detail
 *    properties:
 *      id:
 *        type: integer
 *        description: The auto-generated id of the address
 *      clientId:
 *        type: string
 *        description: The client id
 *      nomencature:
 *        type: string
 *        description: The address nomencature
 *      detail:
 *        type: string
 *        description: The address detail
*/
/**
 * @swagger
 * tags:
 *   name: Address
 *   description: The address managing API
 * /address:
 *   get:
 *     summary: Lists all the addresses
 *     tags: [Address]
 *     responses:
 *       200:
 *         description: The list of the addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 *   post:
 *     summary: Create a new address
 *     tags: [Address]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: The created address.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       500:
 *         description: Some server error
 * /address/{id}:
 *   get:
 *     summary: Get the address by id
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The address id
 *     responses:
 *       200:
 *         description: The address response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       404:
 *         description: The address was not found
 *   patch:
 *    summary: Update the address by the id
 *    tags: [Address]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The address id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Address'
 *    responses:
 *      200:
 *        description: The address was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Address'
 *      404:
 *        description: The address was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the address by id
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The address id
 *
 *     responses:
 *       200:
 *         description: The address was deleted
 *       404:
 *         description: The address was not found
 */


import express from 'express';
import passport from 'passport';

import AddressService from '../services/address.service.js';
import validatorHandler from '../middlewares/validator.handler.js';
import { updateAddressSchema, createAddressSchema, getAddressSchema } from '../schemas/address.schema.js';

const router = express.Router();
const service = new AddressService();



router.get('/', 
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
  try {
    const addresses = await service.find();
    res.json(addresses);
  } catch (error) {
    next(error);
  }
});

router.get('/:addressId',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getAddressSchema, 'params'),
  async (req, res, next) => {
    try {
      const { addressId } = req.params;
      const address = await service.findOne(addressId);
      res.json(address);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  // passport.authenticate('jwt', { session: false }),
  validatorHandler(createAddressSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newAddress = await service.create(body);
      res.status(201).json(newAddress);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:addressId',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getAddressSchema, 'params'),
  validatorHandler(updateAddressSchema, 'body'),
  async (req, res, next) => {
    try {
      const { addressId } = req.params;
      const body = req.body;
      const address = await service.update(addressId, body);
      res.json(address);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:addressId',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getAddressSchema, 'params'),
  async (req, res, next) => {
    try {
      const { addressId } = req.params;
      await service.delete(addressId);
      res.status(201).json({addressId});
    } catch (error) {
      next(error);
    }
  }
);

export default router;
