import prisma from "../config/prisma.js";

export const createRecord = async (req, res, next) => {
  try {
    // console.log(req.body)
    const { userId, type, value } = req.body
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