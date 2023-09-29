import {Router} from 'express'
import { signup, update, signin } from '../controllers/auth.controller'

const router = Router()

router.get('/api/signin', signin)
router.post('/api/signup', signup)
router.put('/api/signup', update)

export default router
