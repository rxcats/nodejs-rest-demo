const {validationResult} = require('express-validator/check');
const ServiceError = require('../error/ServiceError');

exports.hello = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return next(new ServiceError({code: -1, result: null, message: null, details: result.array()}));
    }

    return res.json({
        code: 0,
        result: 'hello',
        message: 'Success',
        details: null,
    });
};