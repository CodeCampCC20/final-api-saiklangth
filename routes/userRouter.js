import express from "express";
import { listUser, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.get('/me', listUser)
router.patch('/me/:id', updateUser)

export default router;