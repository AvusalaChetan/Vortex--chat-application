const errorMiddleWare = (err, req, res, next) => {
  err.message ||= "internal server error";
  err.statusCode ||= 500;

  return res
    .status(err.statusCode)
    .json({success: false, message: err.message});
};

const TryCatch = (passedFn) => async (req, res, next) => {
  try {
    await passedFn(req, res, next);
  } catch (error) {
    next(error);
  }
};

export {errorMiddleWare, TryCatch};
