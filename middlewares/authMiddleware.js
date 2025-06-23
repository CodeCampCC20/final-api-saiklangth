import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";

export const authCheck = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if(!header) {
      createError(401, "Token is missing !!")
    }
    console.log(header)
    const token = header.split(' ')[1];
    jwt.verify(token, process.env.SECRET, (error, decode) => {
      console.log(error)
      console.log(decode)
      if(error) {
        createError(401, "Token is Invalid !!")
      }
      req.user = decode
      next();
    })
  } catch (error) {
    next(error)
  }
}