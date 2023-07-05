/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The auth managing API
 * /auth/login:
 *   post:
 *     summary: Login for the user
 *     tags: [Auth]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                  type: string
 *                 password:
 *                  type: string
 * /auth/recovery:
 *   post:
 *     summary: Ask for a recovery token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              email:
 *                type: string
 *     responses:
 *       200:
 *         description: The generated token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                token:
 *                  type: string
 *       500:
 *         description: Server error
 * /auth/change-password:
 *   post:
 *     summary: Change the password with the token
 *     tags: [Auth]
 *     request body:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          token:
 *           type: string
 *          newPassword:
 *            type: string
 *     responses:
 *       200:
 *         description: Passowrd changed succesfully
 *         contens:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                 type: string
 *       404:
 *         description: The password was not valid
 */


import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import { config } from './../config/config.js'
import AuthService from './../services/auth.service.js';

const router = express.Router();
const service = new AuthService;

// router.use(
//   session({
//     secret: 'secret-key',
//     resave: false,
//     saveUninitialized: false,
//   })
// );

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
});


router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const response = await service.sendRecovery(email);
      res.json(response);
    } catch (error) {
      next(error);
    }
});

router.post('/change-password',
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const response = await service.changePassword(token, newPassword);
      res.json(response);
    } catch (error) {
      next(error);
    }
});

export default router;
