import mongoose from "mongoose"
import app from "./app.js"
import config from "./config/index.js"
import authRouter from "./routes/authRoutes.js"
import productRouter from "./routes/productRoutes.js"

(async () => {
    try {
        await mongoose.connect(config.MONGODB_URL)
        console.log("DB CONNECTED SUCCESSFULLY");

        app.on("error", (err) => {
            console.log(err);
            throw err;
        })

        app.use('/api/auth', authRouter)
        app.use('/api/product', productRouter)

        app.listen(config.PORT, () => {
            console.log(`Port listening at ${config.PORT}`);
        })
    } catch (error) {
        console.log(error);
        throw error
    }
})();