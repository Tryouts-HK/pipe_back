import passport from "passport";
import Auth from "../models/auth/auth.js";
import { createToken, verifyToken } from "../utils/token.js";
// import { switchProfile } from "../utils/switch_handler.js";
import errorHandler from "../utils/error_handler.js";
import { ROLE_CODE_DECODER, ROLE_ENCODER } from "../utils/constant.js";
import dotenv from "dotenv";
dotenv.config();

export const register_post = async (req, res, next) => {
  if (req.body.password && req.body.password.length >= 8) {
    try {
      // const result = await switchProfile(req.body.role).create({
      const result = await User.create({
        email: req.body.email,
        password: req.body.password,
        role: ROLE_ENCODER[req.body.role.toUpperCase()],
      });
      await Auth.create({
        who: result._id,
        whoType: switchProfile(req.body.role).constructor.modelName,
        secret: req.body.password,
      });
      // setting up passport serializer
      req.login(result, (err) => {
        console.log("we in");
        if (err) {
          console.log("but theres a problem");
          console.error(err);
          return next(err);
        }
      });
      const accessToken = createToken(result);
      res.status(201).json({
        status: "success",
        message: "Account Created successfully!",
        data: result,
        accessToken: accessToken,
      });
    } catch (error) {
      console.log(error);
      const cleanedError = errorHandler(error);
      res.status(400).json({ status: "error", message: cleanedError });
    }
  } else {
    const error = new Error("Password Length Short");
    const cleanedError = errorHandler(error);
    res.status(400).json({ status: "error", message: cleanedError });
  }
};

export const log_in_get = async (req, res) => {
  res.render("auth/login");
};

//login post is attached to passport.js

export const log_out = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    console.log("nigga just logged out");
    // what's the appropriate code for logging out?
    res
      .status(200)
      .json({ status: "success", message: "Logged out successfully" });
  });
};

export const forgot_password = (req, res) => {
  res.render("forgot-password");
};

export const recover_password = async (req, res) => {
  console.log(req.body.email);
  if (req.body.email) {
    try {
      const result = await switchProfile(req.body.role).RecoverPassword(
        req.body.email
      );
      res.status(200).json({ status: "success", data: result });
    } catch (error) {
      console.log("df", error);
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "Please supply a Valid email address" });
  }
};

export const choose_account_type = (req, res, next) => {
  // res.session.
  res.redirect("selectUser?");
  res.status(200).json({ status: "success", message: userDetails });
};

export const reset_password_get = (req, res) => {
  const resetId = req.params.resetId;
  res.status(200).json({ token: resetId });
};

export const reset_password_post = async (req, res) => {
  console.log(req.body);
  try {
    const { email, id, role, key } = verifyToken(req.body.token);
    console.log("decoded ", email, id, role);
    if (req.body.email != email) {
      res.status(400).json({ error: "Incorrect Details Supplied" });
    } else if (req.body.password?.length >= 8) {
      result = await switchProfile(role).ResetPassword(
        id,
        key,
        req.body.password
      );
      if (result === "updated") {
        res
          .status(200)
          .json({ status: "success", data: "Password updated successfully" });
      }
    } else {
      res
        .status(400)
        .json({ status: "error", message: "Password length is too short" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const local_scope = (req, res, next) => {
  passport.authenticate("local", { session: false })(req, res, next);
};

export const jwt_scope = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    // If there's an error during authentication,
    // pass it to the next middleware.
    if (err) {
      return next(err);
    }

    // If the user is not authenticated,
    // send an unauthorized response.

    if (!user) {
      return res
        .status(401)
        .json({ status: "error", message: "Unauthorized: invalid token" });
    }

    // If the user is authenticated, attach the user object to the request object.
    req.user = user;

    // Proceed to the next middleware or route handler.
    next();
  })(req, res, next);
};

export const google_scope = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: req.query.role,
  })(req, res, next);
};

export const sign_in_with_google = (req, res, next) => {
  passport.authenticate("google")(req, res, next);
};

export const facebook_scope = (req, res, next) => {
  passport.authenticate("facebook", {
    scope: ["profile", "email"],
  })(req, res, next);
};

export const sign_in_with_facebook = (req, res, next) => {
  passport.authenticate("facebook")(req, res, next);
};

export const apple_scope = (req, res, next) => {
  passport.authenticate("apple", {
    scope: ["profile", "email"],
  })(req, res, next);
};

export const sign_in_with_apple = (req, res, next) => {
  console.log("we got here my man");
  passport.authenticate("apple")(req, res, next);
};

export const smart_redirect = (req, res) => {
  const url = req.session.returnTo || "/dashboard";
  console.log(
    `current logged in user is a ${ROLE_CODE_DECODER[req.user.role]}, ${
      req.user.email
    }`
  );
  const accessToken = createToken(req.user);
  res.json({ redirect: url, data: req.user, accessToken: accessToken });
};

export const smart_redirect_google = (req, res) => {
  const url = req.session.returnTo || process.env.DEFAULT_AUTH_USER_ROUTE; //
  // res.redirect(url);
  res.json({ redirect: url, data: req.user });
};

export default {
  register_post,
  choose_account_type,
  log_in_get,
  log_out,
  forgot_password,
  recover_password,
  reset_password_get,
  reset_password_post,
  sign_in_with_google,
  sign_in_with_facebook,
  sign_in_with_apple,
  local_scope,
  google_scope,
  facebook_scope,
  apple_scope,
  smart_redirect,
  smart_redirect_google,
};
