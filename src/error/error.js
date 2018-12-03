const ServiceError = require('./ServiceError');

exports.converter = (err, req, res, next) => {
    if (err instanceof ServiceError) {
        res.json({
            code: err.code,
            result: err.result,
            message: err.message,
            details: err.details,
        });
    }

    if (err instanceof Error) {
        res.json({
            code: -1,
            result: null,
            message: err.message,
            details: err.stack,
        });
    }

    console.log('error', err);

};