import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";

export const createRecord = async (req, res, next) => {
  try {
    // console.log(req.body)
    const { userId, type, value } = req.body
    const checkUserFromNote = await prisma.doctorNote.findFirst({
      where: {
        userId: Number(userId)
      }
    })
    if(!checkUserFromNote) {
      createError(400, "Awaiting doctor to record User ID.")
    }
    const record = await prisma.healthRecord.create({
      data: {
        userId: Number(userId),
        type: type,
        value: value
      }
    })
    console.log(record)
    res.json({ message: "create health record successfully" })
  } catch (error) {
    next(error)
  }
}

export const getAllRecord = async (req, res, next) => {
  try {
    const record = await prisma.healthRecord.findMany()
    console.log(record)
    res.json({ record })
  } catch (error) {
    next(error)
  }
}

export const getRecordId = async (req, res, next) => {
  try {
    const { id } = req.params
    const record = await prisma.healthRecord.findFirst({
      where: {
        id: Number(id)
      }
    })
    res.json({ record })
  } catch (error) {
    next(error)
  }
}

export const updateRecord = async (req, res, next) => {
  try {
    const { id } = req.params
    const { type, value } = req.body
    const record = await prisma.healthRecord.update({
      where: {
        id: Number(id)
      },
      data: {
        type: type,
        value: value,
      }
    })
    // console.log(record) 
    res.send(record)
  } catch (error) {
    next(error)
  }
}

export const removeRecord = async (req, res, next) => {
  try {
    const { id } = req.params
    const record = await prisma.healthRecord.delete({
      where: {
        id: Number(id)
      }
    })
    res.json({ message: `Delete record ${id} Success` })
  } catch (error) {
    next()
  }
}