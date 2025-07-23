// Notlarla ilgili API endpointleri burada tanımlanacak. 
import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  toggleFavorite,
} from "../controllers/noteController.js";
 

const router = Router();

router.get("/notes", auth, getNotes)
router.post("/notes", auth, createNote)
router.get("/notes/:id", auth, getNoteById)
router.put("/notes/:id", auth, updateNote)
router.delete("/notes/:id", auth, deleteNote)
router.patch("/notes/:id/favorite", auth, toggleFavorite)

export default router;