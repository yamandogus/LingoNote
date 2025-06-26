// Notlarla ilgili API endpointleri burada tanımlanacak. 
import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";
 

const router = Router();


router.get("/", auth, getNotes)

router.post("/", auth, createNote)

router.get("/:id", auth, getNoteById)

router.put("/:id", auth, updateNote)

router.delete("/:id", auth, deleteNote)


export default router;