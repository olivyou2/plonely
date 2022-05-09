const validator = require('express-joi-validation').createValidator({});

const { Router } = require('express');
const { loginUserRoute, createUserRoute } = require('../controller/user.controller');
const { loginUserValidator, createUserValidator } = require('../validator/user.validator');

const router = Router();

router.post('/', validator.body(loginUserValidator.body), loginUserRoute);
router.put('/', validator.body(createUserValidator.body), createUserRoute);

module.exports = router;
