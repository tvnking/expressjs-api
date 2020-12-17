import express from 'express'
import { validate } from 'express-validation'
import {
  createPost, listPost, showPost, editPost, deletePost,
} from '../../controllers/post.controller'
import {
  createPostValidation, deletePostValidation, editPostValidation, getPostValidation,
} from '../../validations/post.validation'

const router = express.Router()

// GET POST /api/posts
router.route('/')
  .get(listPost)
  .post(validate(createPostValidation, { keyByField: true }), createPost)

// GET UPDATE DELETE  /api/posts/:id
router.route('/:id')
  .get(validate(getPostValidation), showPost)
  .put(validate(editPostValidation), editPost)
  .delete(validate(deletePostValidation), deletePost)

export default router
