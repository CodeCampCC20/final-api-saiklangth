import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

export const listDoctor = async (req, res, next) => {
  try {
    const doctor = await prisma.doctor.findMany({
      omit: { password: true }
    })
    res.json(doctor)
  } catch (error) {
    next(error)
  }
}

export const updateDoctor = async (req, res, next) => {
  try {
    const { id } = req.params
    const { username, password, specialization } = req.body
    const hashPassword = bcrypt.hashSync(password, 10);
    const doctor = await prisma.doctor.update({
      where: {
        id: Number(id)
      },
      data: {
        username: username,
        password: hashPassword,
        specialization: specialization
      }
    })
    console.log(id, username, password)
    res.json({ id: doctor.id, username: doctor.username, specialization: doctor.specialization })
  } catch (error) {
    next(error)
  }
}