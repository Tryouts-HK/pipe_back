import { Strategy as localStrategy } from "passport-local";
import PassportJWT from "passport-jwt";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/account/user.js";

const passportConfig = (passport) => {
  // Serialize User
  passport.serializeUser(async (user, next) => {
    const userId = { id: user.id, role: user.role };
    next(null, userId);
  });

  // Deserialize User
  passport.deserializeUser(async (userId, next) => {
    try {
      const result = await User.findById(userId.id);
      next(null, result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  // Configure Local Strategy
  passport.use(
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, next) => {
        try {
          const result = await User.Login(email, password);
          next(null, result);
        } catch (error) {
          console.log(error);
          next(error, null);
        }
      }
    )
  );

  const opts = {
    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  // Configure JWT Strategy
  passport.use(
    new PassportJWT.Strategy(opts, (payload, next) => {
      try {
        next(null, payload);
      } catch (error) {
        console.log(error);
        next(error, null);
      }
    })
  );
};

export default passportConfig;
