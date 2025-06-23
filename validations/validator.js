import { object, ref, string } from "yup";

export const registerSchemaDoctor = object({
  username: string().min(3, "username ต้องมากกว่า 3 อักขระ").required("Please fill username"),
  password: string().min(3, "password ต้องมากกว่า 3 อักขระ").required("Please fill password"),
  confirmPassword: string().oneOf([ref("password"), null], "Confirm Password Worng!"),
  specialization: string().required("Please fill your special"),
})

export const registerSchemaUser = object({
  username: string().min(3, "username ต้องมากกว่า 3 อักขระ").required("Please fill username"),
  password: string().min(3, "password ต้องมากกว่า 3 อักขระ").required("Please fill password"),
  confirmPassword: string().oneOf([ref("password"), null], "Confirm Password Worng!"),
})

export const loginSchema = object({
  username: string().min(3, "username ไม่ถูกต้อง").required("Please fill username"),
  password: string().min(3, "password ไม่ถูกต้อง").required("Please fill password"),
})

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    const errMsg = error.errors.map((item) => item)
    const errTxt = errMsg.join(",")
    const mergeErr = new Error(errTxt)
    next(mergeErr)
  }
}