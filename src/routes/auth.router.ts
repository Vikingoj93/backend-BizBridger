import { Router } from "express";
import { profile } from "../controllers/auth.controller.profile";
import { events, tasks, notes, getEvents, updateEvent } from "../controllers/auth.controller.diary";

const router = Router();

//rutas del perfil
router.get("/dashboard/profile", profile);

//rutas diary/event
router.post("/dashboard/diary/events", events);
router.get("/dashboard/diary/events", getEvents);
router.put("/dashboard/diary/events", updateEvent);

//rutas diary task
router.post("/dashboard/diary/tasks", tasks);

//rutas diary notes
router.post("/dashboard/diary/notes", notes);

export default router;
