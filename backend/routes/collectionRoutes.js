import express from "express"
import { createCollection, deleteCollection, getCollection, updateCollection } from "../controllers/collection.controller.js"
import { isAdmin, isLoggedIn } from "../middlewares/auth.middleware.js"
const router = express.Router()


router.post("/", isLoggedIn, isAdmin, createCollection)
router.put("/:id", isLoggedIn, isAdmin, updateCollection)
router.delete("/:id", isLoggedIn, isAdmin, deleteCollection)
router.get("/", getCollection)



export default router