import express from "express";
import { loginDoctor, loginUser, registerDoctor, registerUser } from "../controllers/authController.js";
import { loginSchema, registerSchemaDoctor, registerSchemaUser, validate } from "../validations/validator.js";

const router = express.Router();

router.post("/register/doctor", validate(registerSchemaDoctor), registerDoctor)
router.post("/register/user", validate(registerSchemaUser), registerUser)

router.post("/login/doctor", validate(loginSchema), loginDoctor)
router.post("/login/user", validate(loginSchema), loginUser)

export default router;