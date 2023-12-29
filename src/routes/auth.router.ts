import { Router } from "express";
import { profile } from "../controllers/auth.controller.profile";
import { events, getEvents, updateEvent, eventDelete } from "../controllers/auth.controller.diaryEvents";
import { tasks } from "../controllers/auth.controller.diaryTasks";
import { notes } from "../controllers/auth.controller.diaryNotes";

const router = Router();

//rutas del perfil
router.get("/dashboard/profile", profile);

//rutas diary/event
router.get("/dashboard/diary/events", getEvents);
router.post("/dashboard/diary/events", events);
router.put("/dashboard/diary/events", updateEvent);
router.delete("/dashboard/diary/events", eventDelete)

//rutas diary task
router.post("/dashboard/diary/tasks", tasks);

//rutas diary notes
router.post("/dashboard/diary/notes", notes);

export default router;
