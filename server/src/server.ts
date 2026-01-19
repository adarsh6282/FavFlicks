import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import userRouter from "./routes/user.routes"
import omdbRoutes from "./routes/omdb.routes"
import connectDB from "./config/db.config"
dotenv.config()

const app=express()

connectDB()

let allowedOrigins=[
    "http://localhost:5173",
    "https://favflicks-1.onrender.com"
]

app.use(cors({
    origin:allowedOrigins,
    credentials:true
}))
app.use(express.json())
app.use(morgan("dev"))
app.use(express.urlencoded({extended:true}))

app.use("/api",userRouter)
app.use("/api/movies",omdbRoutes)

const PORT=process.env.PORT||5000

app.listen(PORT,()=>{
    console.log("server started")
})