import { Router } from "express";
import { profile } from "../controllers/auth.controller.profile";
import {
  getEvents,
  postEvents,
  eventDelete,
  updateEvent,
} from "../controllers/auth.controller.diaryEvents";
import {
  getTasks,
  postTasks,
  taskDelete,
  updateTasks,
} from "../controllers/auth.controller.diaryTasks";
import {
  getNotes,
  postNotes,
  noteDelete,
  updateNotes,
} from "../controllers/auth.controller.diaryNotes";

const router = Router();

//rutas del perfil
router.get("/dashboard/profile", profile);

//rutas diary/event
router.get("/dashboard/diary/events", getEvents);
router.post("/dashboard/diary/events", postEvents);
router.put("/dashboard/diary/events", updateEvent);
router.delete("/dashboard/diary/events", eventDelete);

//rutas diary task
router.get("/dashboard/diary/tasks", getTasks);
router.post("/dashboard/diary/tasks", postTasks);
router.put("/dashboard/diary/tasks", updateTasks);
router.delete("/dashboard/diary/tasks", taskDelete);

//rutas diary notes
router.get("/dashboard/diary/notes", getNotes);
router.post("/dashboard/diary/notes", postNotes);
router.put("/dashboard/diary/notes", updateNotes);
router.delete("/dashboard/diary/notes", noteDelete);

export default router;
