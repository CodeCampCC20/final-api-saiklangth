import express from "express";
import { listDoctor, updateDoctor } from "../controllers/doctorController.js";

const router = express.Router();

router.get('/me', listDoctor)
router.patch('/me/:id', updateDoctor)

export default router;