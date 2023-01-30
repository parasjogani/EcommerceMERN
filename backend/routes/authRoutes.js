import express from "express"
import { changePassword, forgotPassword, getProfile, login, logout, resetPassword, signUp } from "../controllers/authController.js"
const router = express.Router()

router.post("/signup", signUp)
router.post("/login", login)
router.post("/logout", logout)
router.get("/profile", getProfile)
router.post("/password/forgot", forgotPassword)
router.post("/password/reset/:token", resetPassword)
router.post("/password/changepassword", changePassword)

export default router