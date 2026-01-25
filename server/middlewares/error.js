import { envMode } from "../app.js";


const errorMiddleWare = (err, req, res, next) => {
  err.message ||= "internal server error";
  err.statusCode ||= 500;
  console.error(err);

  if (err.code === 11000) {
    err.message = `${Object.keys(err.keyValue)} already exists`;
    err.statusCode = 400;
  }

  if (err.name === "CastError") {
    err.message = `Resource not found. Invalid: ${err.path}`;
    err.statusCode = 400;
  }

  return res.status(err.statusCode).json({
    success: false,
    message: envMode === "DEVELOPMENT" ? err : err.message,
  });
};

const TryCatch = (passedFn) => async (req, res, next) => {
  try {
    await passedFn(req, res, next);
  } catch (error) {
    next(error);
  }
};

export {errorMiddleWare, TryCatch};
