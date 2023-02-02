import express from "express"
import { createCoupon, deactivateCoupon, deleteCoupon, getAllCoupons } from "../controllers/coupons.controller.js"
import { isAdmin, isLoggedIn } from "../middlewares/auth.middleware.js"
const router = express.Router()


router.post("/", isLoggedIn, isAdmin, createCoupon)
router.get("/", isLoggedIn, isAdmin, getAllCoupons)
router.put("/:id", isLoggedIn, isAdmin, deactivateCoupon)
router.delete("/:id", isLoggedIn, isAdmin, deleteCoupon)

export default router