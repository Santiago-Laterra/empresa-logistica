import express, { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/mongo"
import userRouter from "./routes/userRoutes"
import fileRouter from "./routes/fileRoutes"
import authRouter from "./routes/authRoutes"
dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json());



app.get("/", (__, res) => {
  res.send("Empresa Logistica ☀️    API funcionando correctamente");
});

app.use('/api/files', fileRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter)

app.listen(PORT, () => {
  console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`)
  connectDB()
})



