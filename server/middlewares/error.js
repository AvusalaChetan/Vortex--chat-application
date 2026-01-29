import { envMode } from "../app.js";


const errorMiddleWare = (err, req, res, next) => {
  err.message ||= "internal server error";
  err.statusCode ||= 500;

  if (err.code === 11000) {
    err.message = `${Object.keys(err.keyValue)} already exists`;
    err.statusCode = 400;
  }

  if (err.name === "CastError") {
    err.message = `Resource not found. Invalid: ${err.path}`;
    err.statusCode = 400;
  }

  const response = {
    success: false,
    message: err.message,
  };

  // Add stack trace in development mode
  if (envMode === "DEVELOPMENT") {
    response.stack = err.stack;
  }

  return res.status(err.statusCode).json(response);
};

const TryCatch = (passedFn) => async (req, res, next) => {
  try {
    await passedFn(req, res, next);
  } catch (error) {
    next(error);
  }
};

export { errorMiddleWare, TryCatch };
