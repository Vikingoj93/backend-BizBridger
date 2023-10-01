import {Router} from 'express'
import {profile, tasks} from '../controllers/auth.controller'
import { ensureAuthenticated } from '../middlewares/userAutenticated'

const router = Router()

router.use(ensureAuthenticated)
router.get('/api/dashboard/profile', profile)
router.post('/api/dashboard/tasks', tasks)

export default router
