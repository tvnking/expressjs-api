import httpStatus from 'http-status'
import APIError from '../utils/APIError'
import Post from '../models/post.model'
import { postSerializer, postCollectionSerializer } from '../serializers/post.serializer'

export const listPost = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1
    const perPage = 50
    const totalPosts = await Post.countDocuments()
    const posts = await Post.find()
      .skip((page - 1) * perPage)
      .limit(perPage)

    res.json({
      posts: postCollectionSerializer(posts),
      count: { totalPosts },
    })
  } catch (error) {
    next(error)
  }
}

export const createPost = async (req, res, next) => {
  try {
    const post = new Post(req.body)
    const savedPost = await post.save()

    res.status(httpStatus.CREATED).json({ post: postSerializer(savedPost) })
  } catch (error) {
    next(error)
  }
}

export const showPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        message: 'Post not found',
      })
    }

    res.json(postSerializer(post))
  } catch (error) {
    next(error)
  }
}

export const editPost = async (req, res, next) => {
  try {
    const filter = { _id: req.params.id }
    const post = await Post.findOneAndUpdate(filter, req.body, { new: true })
    if (!post) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        message: 'Post not found',
      })
    }

    res.json({ post: postSerializer(post) })
  } catch (error) {
    next(error)
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const filter = { _id: req.params.id }
    const post = await Post.findOneAndRemove(filter)
    if (!post) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        message: 'Post not found',
      })
    }

    res.status(httpStatus.NO_CONTENT).send()
  } catch (error) {
    next(error)
  }
}
