import express from "express"
import { addAddress, adminLogin, applyCoupon, blockUser, changePassword, emptyCart, forgotPassword, getAllUser, getProfile, getUserCart, getWishlist, login, logout, resetPassword, signUp, unblockUser, userCart } from "../controllers/auth.controller.js"
import { isLoggedIn, isAdmin } from "../middlewares/auth.middleware.js"
const router = express.Router()

router.post("/signup", signUp)
router.post("/login", login)
router.post("/admin-login", adminLogin)
router.post("/logout",isLoggedIn, logout)

router.get("/profile", isLoggedIn, getProfile)
router.get("/all-users", isLoggedIn, isAdmin, getAllUser)
router.get("/wishlist", isLoggedIn, getWishlist)
router.put("/add-address", isLoggedIn, addAddress)
router.post("/cart", isLoggedIn, userCart)
router.get("/cart", isLoggedIn, getUserCart)
router.delete("/empty-cart", isLoggedIn, emptyCart)
router.post("/cart/apply-coupon", isLoggedIn, applyCoupon)

router.post("/password/forgot", forgotPassword)
router.post("/password/reset/:token", resetPassword)
router.post("/password/changepassword", isLoggedIn, changePassword)

router.put("/block-user/:id", isLoggedIn, isAdmin, blockUser)
router.put("/unblock-user/:id", isLoggedIn, isAdmin, unblockUser)

export default router