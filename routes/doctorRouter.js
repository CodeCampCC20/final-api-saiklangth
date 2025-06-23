import express from "express";
import { listDoctor, updateDoctor } from "../controllers/doctorController.js";
import { authCheck } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/me', listDoctor)
router.patch('/me/:id', authCheck, updateDoctor)

export default router;