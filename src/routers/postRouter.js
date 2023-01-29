const express = require('express');
const postController = require('../controllers/post.controller');
const {
  authorizationMiddleware,
} = require('../middlewares/authorization.middleware');

const router = express.Router();

router.post('/', authorizationMiddleware, postController.createNewPost);
router.get('/', authorizationMiddleware, postController.listPosts);
router.get('/:id', authorizationMiddleware, postController.findPost);
// router.put('/:id', postController);
// router.delete('/:id', postController);
// router.get('/search', postController);

module.exports = router;
