import express from "express"
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct, wishlistProduct } from "../controllers/product.controller.js"
const router = express.Router()

import { isAdmin, isLoggedIn } from "../middlewares/auth.middleware.js"

router.post("/", isLoggedIn, isAdmin, addProduct)
router.get("/:id", getProductById)
router.get("/", getAllProducts)
router.put("/wishlist", isLoggedIn, wishlistProduct)
router.post("/:id", isLoggedIn, isAdmin, updateProduct)
router.delete("/:id", isLoggedIn, isAdmin, deleteProduct)

export default router