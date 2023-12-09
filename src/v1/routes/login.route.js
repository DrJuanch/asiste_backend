const express = require('express');
const router = express.Router();
const { validateCreate } = require('../../validators/loginValidator.js');
const { loginController } = require('../../controller/loginController');

router.post('/', validateCreate, loginController);

module.exports = router;
