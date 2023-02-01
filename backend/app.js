import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"
import authRouter from "./routes/authRoutes.js"
import productRouter from "./routes/productRoutes.js"
import collectionRouter from "./routes/collectionRoutes.js"


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())

//morgan logger
app.use(morgan("tiny"))

//routes
app.use('/api/auth', authRouter)
app.use('/api/product', productRouter)
app.use('/api/collection', collectionRouter)


export default app