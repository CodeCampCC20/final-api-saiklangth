import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";

// Doctor
export const registerDoctor = async (req, res, next) => {
  try {
    console.log(req.body)
    const { username, password, specialization } = req.body
    const doctor = await prisma.doctor.findFirst({
      where: {
        username: username
      }
    })
    if (doctor) {
      createError(400, "Username already exists!")
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const result = await prisma.doctor.create({
      data: {
        username: username,
        password: hashPassword,
        specialization: specialization
      }
    })

    console.log(result)
    res.json({ message: "Register doctor Successfully" })
  } catch (error) {
    next(error);
  }
}

export const loginDoctor = async (req, res, next) => {
  try {
    console.log(req.body)
    const { username, password, specialization } = req.body
    const doctor = await prisma.doctor.findFirst({
      where: {
        username: username
      }
    })
    if (!doctor) {
      createError(400, "Username or Password is Invalid !!")
    }
    const checkPassword = bcrypt.compareSync(password, doctor.password)
    if (!checkPassword) {
      createError(400, "Username or Password is Invalid !!")
    }
    const payload = { id: doctor.id }
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" })
    console.log(token)
    res.json({ id: doctor.id, username: username, specialization: doctor.specialization, accessToken: token })
  } catch (error) {
    next(error);
  }
}

// User
export const registerUser = async (req, res, next) => {
  try {
    console.log(req.body)
    const { username, password } = req.body
    const user = await prisma.user.findFirst({
      where: {
        username: username
      }
    })
    if (user) {
      createError(400, "Username already exists!")
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const result = await prisma.user.create({
      data: {
        username: username,
        password: hashPassword
      }
    })

    console.log(result)
    res.json({ message: "Register user Successfully" })
  } catch (error) {
    next(error);
  }
}

export const loginUser = async (req, res, next) => {
  try {
    console.log(req.body)
    const { username, password } = req.body
    const user = await prisma.user.findFirst({
      where: {
        username: username
      }
    })
    if (!user) {
      createError(400, "Username or Password is Invalid !!")
    }
    const checkPassword = bcrypt.compareSync(password, user.password)
    if (!checkPassword) {
      createError(400, "Username or Password is Invalid !!")
    }
    const payload = { id: user.id }
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" })
    console.log(token)
    res.json({ id: user.id, username: username, accessToken: token })
  } catch (error) {
    next(error);
  }
}