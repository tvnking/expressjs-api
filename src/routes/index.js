import express from 'express'
import apiRoutes from './api'

const router = express.Router()

router.use('/api', apiRoutes)

router.route('/status')
  .get((req, res) => res.send('Server running. Good luck!'))

export default router
