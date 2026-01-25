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


const isAdmin = TryCatch(async (req, res, next) => {
  const token = req.cookies["vortex-adminToken"];

  if (!token) return next(new ErrorHandler('Admin authentication failed, please login again', 401))
  const cookieToken = jwt.verify(token, process.env.JWT_SECRET);
console.log("cookieToken:", cookieToken);

  const isMatch = cookieToken.secretKey === process.env.ADMIN_SECRET_KEY;

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid Secret Key",
    });
  }

  next()
})

export { isAuthenticated, isAdmin }
