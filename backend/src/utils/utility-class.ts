
// created ErrorHandler to add features such as status code to error class
class ErrorHandler extends Error {
    constructor(public message: string , public statusCode: number) {
        super(message);
        this.statusCode = statusCode
    }
}

export default ErrorHandler;