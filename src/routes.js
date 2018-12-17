const express = require('express');
const router = express.Router();
const helloController = require('./controller/hello.controller');
const helloValidate = require('./validate/hello.validate');

router.get('/', helloValidate.validateHello(), helloController.hello);

module.exports = router;
