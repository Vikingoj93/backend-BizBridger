import { Router } from "express";
import { profile } from "../controllers/auth.controller.profile";
import { postEvents, getEvents, updateEvent, eventDelete } from "../controllers/auth.controller.diaryEvents";
import { getTasks, postTasks, taskDelete, updateTasks } from "../controllers/auth.controller.diaryTasks";
import { notes } from "../controllers/auth.controller.diaryNotes";

const router = Router();

//rutas del perfil
router.get("/dashboard/profile", profile);

//rutas diary/event
router.get("/dashboard/diary/events", getEvents);
router.post("/dashboard/diary/events", postEvents);
router.put("/dashboard/diary/events", updateEvent);
router.delete("/dashboard/diary/events", eventDelete)

//rutas diary task
router.get("/dashboard/diary/tasks", getTasks);
router.post("/dashboard/diary/tasks", postTasks);
router.put("/dashboard/diary/tasks", updateTasks);

router.delete("/dashboard/diary/tasks", taskDelete)

//rutas diary notes
router.post("/dashboard/diary/notes", notes);

export default router;
