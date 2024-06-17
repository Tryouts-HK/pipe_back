

// ensure logged in

export function ensureLoggedIn(options) {
    if (typeof options == 'string') {
        options = { redirectTo: options }
    }
    options = options || {};

    let url = options.redirectTo || '/login';
    let setReturnTo = (options.setReturnTo === undefined) ? true : options.setReturnTo;

    return function (req, res, next) {
        if (!req.isAuthenticated || !req.isAuthenticated()) {
            if (setReturnTo && req.session) {
                req.session.returnTo = req.originalUrl || req.url;
            }
            return res.status(401).json({ status: "Error", message: 'Please log in to access this resource' });
        }
        next();
    }
}

// ensure logged out
export function ensureLoggedOut(options) {
    if (typeof options == 'string') {
        options = { redirectTo: options }
    }
    options = options || {};

    let url = options.redirectTo || '/';

    return function (req, res, next) {
        if (req.isAuthenticated && req.isAuthenticated()) {
            return res.status(400).json({ status: "Error", message: 'You are already logged In' });
        }
        next();
    }
}