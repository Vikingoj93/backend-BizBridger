import { Router } from "express";
import { profile } from "../controllers/auth.controller.profile";
import { events, tasks, notes } from "../controllers/auth.controller.diary";

const router = Router();

router.get("/dashboard/profile", profile);
router.post("/dashboard/diary/events", events);
router.post("/dashboard/diary/tasks", tasks);
router.post("/dashboard/diary/notes", notes);

export default router;
