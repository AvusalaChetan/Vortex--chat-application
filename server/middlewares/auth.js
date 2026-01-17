import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";

const isAuthenticated = TryCatch(async (req, res, next) => {
  const token = req.cookies["vortex-token"];
  if (!token)
    return next(new ErrorHandler('Please login to access this route', 401))

  const decodedData = jwt.verify(token, process.env.JWT_SECRET)
  req.userId = decodedData._id
  next()
})

export { isAuthenticated }
