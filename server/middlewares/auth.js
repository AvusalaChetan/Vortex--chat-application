import jwt from "jsonwebtoken";
import { VORTEX_TOKEN } from "../constants/config.js";
import { userModel } from "../models/userModel.js";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";

const isAuthenticated = TryCatch(async (req, res, next) => {
  const token = req.cookies["vortex-token"];
  if (!token)
    return next(new ErrorHandler("Please login to access this route", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = decodedData._id;
  next();
});

const isAdmin = TryCatch(async (req, res, next) => {
  const token = req.cookies["vortex-adminToken"];

  if (!token)
    return next(
      new ErrorHandler("Admin authentication failed, please login again", 401),
    );
  const cookieToken = jwt.verify(token, process.env.JWT_SECRET);
  console.log("cookieToken:", cookieToken);

  const isMatch = cookieToken.secretKey === process.env.ADMIN_SECRET_KEY;

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid Secret Key",
    });
  }

  next();
});


const soketAuthenticator = async (err, socket, next) => {
  try {
    if (err) return next(err);

    const authToken = socket.request.cookies[VORTEX_TOKEN];

    if (!authToken) {
      return next(new ErrorHandler("Socket authentication failed: No token provided", 401));
    }

    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);
    const user = await userModel.findById(decodedData._id);

    if (!user) {
      return next(new ErrorHandler("Socket authentication failed: User not found", 401));
    }

    socket.user = user;
    return next();

  } catch (error) {
    console.log("Socket authentication error:", error);
    return next(new ErrorHandler("Socket authentication failed", 401));
  }
}
export { isAdmin, isAuthenticated, soketAuthenticator };

