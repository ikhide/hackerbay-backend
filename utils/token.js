import jwt from "jsonwebtoken";
import { secrete } from "./keys.js";
import isEmpty from "../validation/is-empty.js";

export const generateToken = (data) => jwt.sign(data, secrete, { expiresIn: "1h" });

export const verifyToken = (req, res, next) => {
  if (isEmpty(req.headers.authorization)) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized"
    });
  }
  const token = req.headers.authorization.split(" ")[1];

  return jwt.verify(token, secrete, (error, user) => {
    if (error) {
      return res.status(401).json({
        status: "error",
        message: "Invalid token"
      });
    }
    req.user = user;
    return next();
  });
};
