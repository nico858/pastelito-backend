/**
 * @swagger
 * components:
 *  schemas:
 *   Product:
 *    type: object
 *    required:
 *      - name
 *      - description
 *      - price
 *      - stock
 *      - urlImage
 *      - categoryId
 *    properties:
 *      id:
 *        type: integer
 *        description: The auto-generated id of the product.
 *      name:
 *        type: string
 *        description: The name of the product.
 *      description:
 *        type: string
 *        description: The description of the product.
 *      price:
 *        type: integer
 *        description: The price of the product.
 *      stock:
 *        type: integer
 *        description: Amount of product in stock.
 *      urlImage:
 *        type: strig
 *        description: Url of the image that shows the product.
 *      categoryId:
 *        type: integer
 *        description: Id of the category the product belongs to.
*/
/**
 * @swagger
 * tags:
 *   name: Product
 *   description: The product managing API
 * /products:
 *   get:
 *     summary: Lists all the products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The created product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 * /products/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product was not found
 *   patch:
 *    summary: Update the product by the id
 *    tags: [Product]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The product id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: The product was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: The product was not found
 *      500:
 *        description: Server error
 *   delete:
 *     summary: Remove the product by id
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *
 *     responses:
 *       200:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 */


import express from "express";
import passport from "passport";

import ProductsService from "./../services/product.service.js";
import validatorHandler from "./../middlewares/validator.handler.js";
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} from "./../schemas/product.schema.js";
import { checkRoles } from "../middlewares/auth.handler.js";

const router = express.Router();
const service = new ProductsService();

router.get("/",
  //passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const products = await service.find();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id",
  //passport.authenticate("jwt", { session: false }),
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/",
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(createProductSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch("/:id",
  passport.authenticate('jwt', {session: false}),
  checkRoles(['Admin']),
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id",
  passport.authenticate('jwt', {session: false}),
  checkRoles(['Admin']),
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
