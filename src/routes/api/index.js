import express from 'express'
import postRoutes from './post.route'

const router = express.Router()

router.use('/posts', postRoutes)
export default router
