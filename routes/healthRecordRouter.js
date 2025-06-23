import express from "express";
import { createRecord, getAllRecord, getRecordId, removeRecord, updateRecord } from "../controllers/healthRecordController.js";
import { authCheck } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/', authCheck, createRecord)
router.get('/', authCheck, getAllRecord)
router.get('/:id', authCheck, getRecordId)
router.patch('/:id', authCheck, updateRecord)
router.delete('/:id', authCheck, removeRecord)

export default router;