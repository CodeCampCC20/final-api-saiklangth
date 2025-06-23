import express from "express";
import { createNote, getAllNote, getNoteFromUserId, receivedNote, removeNote, updateNote } from "../controllers/doctorNoteController.js";
import { authCheck } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/', authCheck, createNote)
router.get('/my-notes', authCheck, getAllNote)
router.get('/user/:userId', authCheck, getNoteFromUserId)
router.get('/received', authCheck, receivedNote)
router.patch('/:id', authCheck, updateNote)
router.delete('/:id', authCheck, removeNote)

export default router;