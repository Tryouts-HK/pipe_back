import express from 'express';
const Router = express.Router();

import dotenv from 'dotenv';
dotenv.config();


import { 
    register_post,
    log_in_get,
    log_out,
    forgot_password,
    recover_password,
    reset_password_get,
    reset_password_post,
    sign_in_with_google,
    local_scope,
    google_scope,
    facebook_scope,
    apple_scope,
    sign_in_with_apple,
    sign_in_with_facebook,
    smart_redirect,
    // choose_account_type,
    smart_redirect_google } from '../controllers/auth.js';
import reqErrorHandler from '../middlewares/req_error_handler.js';
import { ensureLoggedIn, ensureLoggedOut } from '../middlewares/authenticate.js';



Router.route('/register')
    .post(
        ensureLoggedOut(),
        register_post,
        
        smart_redirect, 
        reqErrorHandler);

Router.route("/login")
    .get(log_in_get)
    .post(
        ensureLoggedOut(),
        local_scope, smart_redirect, reqErrorHandler);

    Router.route('/login')
    .post(
        ensureLoggedOut(),
        local_scope, (req, res) => {
            res.status(200).json({ status: "Success", message: "Logged In Successfully" });
        });


// Social Sign-In 
Router.get('/google', google_scope);
Router.get('/facebook', facebook_scope);
Router.get('/apple', apple_scope);


//callback after sign up
Router.get('/google/callback', sign_in_with_google,
    // choose_account_type,
    smart_redirect_google, reqErrorHandler);
Router.get('/facebook/callback', sign_in_with_facebook,
    // choose_account_type,
    smart_redirect_google, reqErrorHandler);
Router.post('/apple/callback', sign_in_with_apple,
    // choose_account_type,
    smart_redirect_google, reqErrorHandler)


//Logout Obviously
Router.route('/logout')
    .post(
        ensureLoggedIn(),
        log_out);


// Password Recovery
Router.route('/recover/password')
    .get(forgot_password)
    .post(recover_password);

Router.get('/reset/password/:resetId', reset_password_get);
Router.post('/reset/password', reset_password_post);

export default Router;