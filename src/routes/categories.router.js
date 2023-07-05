/**
 * @swagger
 * components:
 *  schemas:
 *   Category:
 *    type: object
 *    required:
 *      - name
 *      - image
 *    properties:
 *      id:
 *        type: integer
 *        description: The auto-generated id of the category
 *      name:
 *        type: string
 *        description: The name of the category
 *      image:
 *        type: string
 *        description: The image of the category
*/
/**
 * @swagger
 * tags:
 *   name: Category
 *   description: The category managing API
 * /categories:
 *   get:
 *     summary: Lists all the categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: The list of the categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: The created category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server error
 * /categories/{id}:
 *   get:
 *     summary: Get the category by id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *     responses:
 *       200:
 *         description: The category response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: The category was not found
 *   patch:
 *    summary: Update the category by the id
 *    tags: [Category]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The category id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *    responses:
 *      200:
 *        description: The category was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *      404:
 *        description: The category was not found
 *      500:
 *        description: Server error
 *   delete:
 *     summary: Remove the category by id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *
 *     responses:
 *       200:
 *         description: The category was deleted
 *       404:
 *         description: The category was not found
 */


import express from 'express';

import CategoryService from './../services/category.service.js';
import validatorHanlder from './../middlewares/validator.handler.js';
import { getCategorySchema, createCategorySchema, updateCategorySchema } from './../schemas/category.schema.js';
import passport from 'passport';
import { checkRoles } from '../middlewares/auth.handler.js';

const router = express.Router();
const service = new CategoryService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHanlder(getCategorySchema, 'params'), 
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
});

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('Admin'),
  validatorHanlder(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
});

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('Admin'),
  validatorHanlder(getCategorySchema, 'params'),
  validatorHanlder(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedCategory = await service.update(id, body);
      res.json(updatedCategory);
    } catch (error) {
      next(error);
    }
});

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('Admin'),
  validatorHanlder(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedCategory = await service.delete(id);
      res.json(deletedCategory);
    } catch (error) {
      next(error);
    }
});

export default router;
