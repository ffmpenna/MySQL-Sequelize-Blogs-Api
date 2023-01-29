const express = require('express');
const categoryController = require('../controllers/category.controller');
const {
  authorizationMiddleware,
} = require('../middlewares/authorization.middleware');

const router = express.Router();

router.post('/', authorizationMiddleware, categoryController.createNewCategory);
router.get('/', authorizationMiddleware, categoryController.listCategories);

module.exports = router;
