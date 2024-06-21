import errorHandler from "../utils/error_handler.js";

const reqErrorHandler = async (err, req, res, next) => {
  console.log("error middleware");
  console.log(err);
  if (err) {
    // current work around for passport jwt
    if (err.message == "err is not defined") {
      res
        .status(401)
        .json({ status: "error", message: "access token is invalid" });
    } else {
      try {
        const cleanedError = errorHandler(err);
        if (req.url.includes("/google/callback?")) {
          res.redirect("/api/v1/auth/login?feedback=emailalreadyinuse");
        } else {
          res.status(400).json({ error: cleanedError });
        }
      } catch (error) {
        console.log(error);
        res.json({ error: "fatal error" });
      }
    }
  }
};

export default reqErrorHandler;
