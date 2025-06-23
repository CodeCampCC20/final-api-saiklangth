import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";

export const createNote = async (req, res, next) => {
  try {
    // const { userId } = req.params
    const { userId, doctorId, note } = req.body
    const checkDoctorId = await prisma.doctor.findFirst({
      where: {
        id: Number(doctorId)
      }
    })
    if (!checkDoctorId) {
      createError(400, "Doctor ID Invalid !!")
    }
    const checkUserId = await prisma.user.findFirst({
      where: {
        id: Number(userId)
      }
    })
    if (!checkUserId) {
      createError(400, "User ID Invalid !!")
    }
    const docnote = await prisma.doctorNote.create({
      data: {
        userId: Number(userId),
        doctorId: Number(doctorId),
        note: note
      }
    })
    console.log(docnote)
    res.json({ message: "create doctor notes successfully" })
  } catch (error) {
    next(error)
  }
}

export const getAllNote = async (req, res, next) => {
  try {
    const docnote = await prisma.doctorNote.findMany()
    res.json({ docnote })
  } catch (error) {
    next(error)
  }
}

export const getNoteFromUserId = async (req, res, next) => {
  try {
    const { userId } = req.params
    const docnote = await prisma.doctorNote.findMany({
      where: {
        userId: Number(userId)
      }
    })
    res.json({ docnote })
  } catch (error) {
    next(error)
  }
}

export const receivedNote = async (req, res, next) => {
  try {
    // const { userId } = req.params
    const docnote = await prisma.doctorNote.findMany()
    res.json({ docnote })
  } catch (error) {
    next(error)
  }
}

export const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params
    const { note } = req.body
    const docnote = await prisma.doctorNote.update({
      where: {
        id: Number(id)
      },
      data: {
        note: note
      }
    })
    res.send(docnote)
  } catch (error) {
    next(err)
  }
}

export const removeNote = async (req, res, next) => {
  try {
    const {id} = req.params
    const docnote = await prisma.doctorNote.delete({
      where: {
        id: Number(id)
      }
    })
    res.json({ message: `Delete Note ${id} Success` })
  } catch (error) {
    next(err)
  }
}