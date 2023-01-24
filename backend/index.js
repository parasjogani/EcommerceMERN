import mongoose from "mongoose"
import app from "./app"
import config from "./config/index"

(async () => {
    try {
        await mongoose.connect(config.MONGODB_URL)
        console.log("DB CONNECTED SUCCESSFULLY");

        app.on("error", (err) => {
            console.log(err);
            throw err;
        })

        app.listen(config.PORT, () => {
            console.log(`Port listening at ${config.PORT}`);
        })
    } catch (error) {
        console.log(error);
        throw error
    }
})();