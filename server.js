import express from "express";
import morgan from "morgan";
import authRouter from "./routes/authRouter.js"
import error from "./utils/error.js";
import userRouter from "./routes/userRouter.js"
import doctorRouter from "./routes/doctorRouter.js"
import healthRecordRouter from "./routes/healthRecordRouter.js"

const app = express();
app.use(express.json());
app.use(morgan('dev'));
const PORT = 8000;

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/doctors', doctorRouter)
app.use('/health-records', healthRecordRouter)

app.use(error);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})