import ErrorHandler from "../utils/ErrorHandler.js";

export const ErrorMiddleware=(err,req,res,next) =>{
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if(err.name === 'CastError'){
        const message = "Wrong mongodb id"
        err = new ErrorHandler(message,400)
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
};

export const asyncError = (passedFunction) => (req, res, next) => {
    Promise.resolve(passedFunction(req, res, next)).catch(next);
};