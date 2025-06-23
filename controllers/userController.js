import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

export const listUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findMany({
      omit: { password: true }
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const { username, password } = req.body
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = await prisma.user.update({
      where: {
        id: Number(id)
      },
      data: {
        username: username,
        password: hashPassword
      }
    })
    console.log(id, username, password)
    res.json({ id: user.id, username: user.username })
  } catch (error) {
    next(error)
  }
}