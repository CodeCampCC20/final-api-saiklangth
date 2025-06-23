import express from "express";
import { listUser, updateUser } from "../controllers/userController.js";
import { authCheck } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/me', listUser)
router.patch('/me/:id', authCheck, updateUser)

export default router;