import express from "express"
import { addAddress, adminLogin, blockUser, changePassword, forgotPassword, getProfile, getWishlist, login, logout, resetPassword, signUp, unblockUser } from "../controllers/authController.js"
import { isLoggedIn, isAdmin } from "../middlewares/auth.middleware.js"
const router = express.Router()

router.post("/signup", signUp)
router.post("/login", login)
router.post("/admin-login", adminLogin)
router.post("/logout",isLoggedIn, logout)

router.get("/profile", isLoggedIn, getProfile)
router.get("/wishlist", isLoggedIn, getWishlist)
router.put("/add-address", isLoggedIn, addAddress)

router.post("/password/forgot", forgotPassword)
router.post("/password/reset/:token", resetPassword)
router.post("/password/changepassword", isLoggedIn, changePassword)

router.put("/block-user/:id", isLoggedIn, isAdmin, blockUser)
router.put("/unblock-user/:id", isLoggedIn, isAdmin, unblockUser)

export default router