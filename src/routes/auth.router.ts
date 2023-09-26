import {Router} from 'express'
import { signup, update } from '../controllers/auth.controller'

const router = Router()

router.post('/api/signup', signup)
router.put('/api/singup', update)

export default router
