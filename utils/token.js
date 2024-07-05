import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createToken = (user, ...optional) => {
  const payload = {
    email: user.email,
    id: user._id,
    role: JSON.stringify(user.role),
    key: optional[0],
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 15 });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      console.log("fake");
      return "Not Authorized";
    } else {
      console.log("decoded", decodedToken);
      return decodedToken;
    }
  });
};
