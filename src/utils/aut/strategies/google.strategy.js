import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

import { config } from '../../../config/config.js';

const options = {
    clientID: config.googleClientId,
    clientSecret: config.googleClientSecret,
    callbackURL: "https://pastelito-backend.onrender.com/callback",
    passReqToCallback   : true
}

export const googleStrategy = new GoogleStrategy(options, (req, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
);