import express from "express"
import { blockUser, changePassword, forgotPassword, getProfile, login, logout, resetPassword, signUp, unblockUser } from "../controllers/authController.js"
import { isLoggedIn, isAdmin } from "../middlewares/auth.middleware.js"
const router = express.Router()

router.post("/signup", signUp)
router.post("/login", login)
router.post("/logout",isLoggedIn, logout)
router.get("/profile", isLoggedIn, getProfile)
router.post("/password/forgot", forgotPassword)
router.post("/password/reset/:token", resetPassword)
router.post("/password/changepassword", isLoggedIn, changePassword)
router.put("/block-user/:id", isLoggedIn, isAdmin, blockUser)
router.put("/unblock-user/:id", isLoggedIn, isAdmin, unblockUser)

export default router