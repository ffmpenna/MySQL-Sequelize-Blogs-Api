const express = require('express');
const userController = require('../controllers/user.controller');
const { authorizationMiddleware } = require('../middlewares/authorization.middleware');

const router = express.Router();

router.post('/', userController.createNewUser);
router.get('/', authorizationMiddleware, userController.listUsers);
// router.get('/:id', userController);
// router.delete('/me', userController);

module.exports = router;
