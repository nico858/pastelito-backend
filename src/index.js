import express from 'express';
import swaggerjsdoc from 'swagger-jsdoc';
import swagger from 'swagger-ui-express';
import cors from 'cors';
import session from 'express-session';
import morgan from 'morgan';

import routerAPi from './routes/index.js';
import connection from '../db/database.js';
import { checkApiKey } from './middlewares/auth.handler.js';
import { errorHandler, boomErrorHandler, ormErrorHandler } from './middlewares/error.handler.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'https://localhost:5173',
    credentials: true,
}));
routerAPi(app);

app.use(express.json());
app.use(morgan('dev'));

app.use(
    session({
      secret: 'secret-key',
      resave: false,
      saveUninitialized: false,
    })
);

app.use(errorHandler);
app.use(boomErrorHandler);
app.use(ormErrorHandler);


import passport from 'passport';

import { LocalStrategy } from './utils/aut/strategies/local.strategy.js';
import { jwtStrategy } from './utils/aut/strategies/jwt.strategy.js';
import { googleStrategy } from './utils/aut/strategies/google.strategy.js';



app.use(passport.initialize());
app.use(passport.session());

  
passport.use(LocalStrategy);
passport.use(jwtStrategy);
passport.use(googleStrategy);

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
});

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Store API',
            version: '1.0.0',
            description: 'A simple Express Store API',
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1'
            }
        ]
    },
    apis: ['./src/routes/*.js']
}
const spacs = swaggerjsdoc(options);
app.use(
    '/docs',
    swagger.serve,
    swagger.setup(spacs)
)

// app.get('/', /*checkApiKey,*/ (req, res) => {
//     res.send('Hello World!');
// });

import UserService from './services/user.service.js';
import AuthService from './services/auth.service.js';
import createPassword from './utils/passwordGenerator.js';

const userService = new UserService();
const authService = new AuthService();

app.get('/api/v1/auth/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  async (req, res, next) => {
    console.log("[1]")
    try{
        console.log("[2]")
        const googleUser = req.user;
        const userInfo = {
            firstName: googleUser.given_name,
            lastName: googleUser.family_name,
            email: googleUser.emails[0].value,
            userPassword: createPassword(),
            phone: googleUser.id,
            role: 'customer',
        }
        console.log("[3]")
        const registeredUser = await userService.findByEmail(userInfo.email);
        if (!registeredUser) {
            const newUser = await userService.create(userInfo);
            console.log(authService.signToken(newUser))
            res.status(201).json(authService.signToken(newUser));
        } else {
            res.status(201).json(authService.signToken(registeredUser));
        }
    } catch(error) {
        next(error)
    }
    
  }
);

app.get('/api/v1/auth/google/logout', (req, res) => {
    req.logOut((err) => {
        if (err) {
            console.log('Error logging out:', err);
        }
        req.session.destroy((err) => {
            if (err) {
                console.log('Error destroying session:', err);
            }
            res.redirect('/');
        });
    });
});



app.listen(port, async () => {
    try{
        await connection.authenticate();
        console.log('Connection has been established successfully.');
        console.log(`App listening at port: ${port}`)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
