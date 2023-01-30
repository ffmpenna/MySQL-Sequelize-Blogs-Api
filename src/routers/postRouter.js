const express = require('express');
const postController = require('../controllers/post.controller');
const {
  authorizationMiddleware,
} = require('../middlewares/authorization.middleware');

const router = express.Router();

router.post('/', authorizationMiddleware, postController.createNewPost);
router.get('/', authorizationMiddleware, postController.listPosts);
router.get('/search', authorizationMiddleware, postController.searchPosts);
router.get('/:id', authorizationMiddleware, postController.findPost);
router.put('/:id', authorizationMiddleware, postController.updatePost);
router.delete('/:id', authorizationMiddleware, postController.deletePost);

module.exports = router;
