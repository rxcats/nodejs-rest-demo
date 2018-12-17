const {check} = require('express-validator/check');

exports.validateHello = () => {
    return [
        check('name').exists().withMessage('name required'),
    ]
};