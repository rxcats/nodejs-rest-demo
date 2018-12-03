class ExtendableError extends Error {
    constructor({code, result, message, details}) {
        super(message);
        this.code = code;
        this.result = result;
        this.message = message;
        this.details = details;
    }
}

class ServiceError extends ExtendableError {
    constructor({code, result, message, details}) {
        super({code, result, message, details});
    }
}

module.exports = ServiceError;
