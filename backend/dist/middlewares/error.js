"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TryCatch = exports.errorMiddleware = void 0;
const errorMiddleware = async (err, req, res, next) => {
    // err.message exsist otherwise ""
    err.message || (err.message = "Error Occured");
    err.statusCode || (err.statusCode = 500);
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
exports.errorMiddleware = errorMiddleware;
// wrapper function for try-catch block:
const TryCatch = () => () => {
};
exports.TryCatch = TryCatch;
