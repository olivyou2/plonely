const validator = require('express-joi-validation').createValidator({});

const { Router } = require('express');
const { createGroupRoute, getContainGroupRoute } = require('../controller/group.controller');
const { createGroupValidator, getContainGroupValidator } = require('../validator/group.validator');

const router = Router();

router.post('/', validator.body(createGroupValidator.body), createGroupRoute);
router.put('/', validator.body(getContainGroupValidator.body), getContainGroupRoute);

module.exports = router;
