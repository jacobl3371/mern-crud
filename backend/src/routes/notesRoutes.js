import express from "express";
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";

const app = express();

const noteRouter = express.Router();

noteRouter.get("/", getAllNotes);

noteRouter.get("/:id", getNoteById);

noteRouter.post("/", createNote);

noteRouter.put("/:id", updateNote);

noteRouter.delete("/:id", deleteNote);

export default noteRouter;
