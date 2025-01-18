"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// created ErrorHandler to add features such as status code to error class
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.statusCode = statusCode;
    }
}
exports.default = ErrorHandler;
