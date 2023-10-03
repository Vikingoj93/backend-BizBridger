import {Router} from 'express'
import { profile, tasks} from '../controllers/auth.controller'

const router = Router()

router.get('/dashboard/profile', profile)
router.post('/dashboard/profile/tasks', tasks)

export default router;
