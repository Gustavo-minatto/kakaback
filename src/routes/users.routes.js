const express = require('express');
const UsersController = require('../controllers/UsersController');
const router = express.Router();

router.post('/', UsersController.create);

module.exports = router;
