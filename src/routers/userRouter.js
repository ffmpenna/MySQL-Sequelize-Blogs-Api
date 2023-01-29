const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/', userController.createNewUser);
// router.get('/', userController);
// router.get('/:id', userController);
// router.delete('/me', userController);

module.exports = router;
