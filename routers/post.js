const express = require('express');
const router = express.Router();

const controller = require('../controllers/post-controller')

router.get('/',controller.getIndex);

router.post('/',controller.postPost);

router.get('/posts/:postid',controller.getPostPage);

router.get('/posts',controller.getPost);

module.exports = router;