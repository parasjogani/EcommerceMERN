import User from "../models/user.schema"
import JWT  from "jsonwebtoken"
import asyncHandler from "../services/asyncHandler"
import CustomError from "../utils/customError"
import config from "../config/index"

export const isLoggedIn = asyncHandler(async (req, res, next) => {
    let token;
    
    if (req.cookie.token || (req.headers.authorization && req.headers.authorization.startWith("Bearer"))) {
        token = req.cookie.token || req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        throw new CustomError("Not authorized to access this page", 401)
    }

    try {
        const decodedJwt = JWT.verify(token, config.JWT_SECRET)
        
        req.user = await User.findById(decodedJwt._id, "name email role")
        next()
    } catch (error) {
        throw new CustomError("Not authorized to access this page", 401)
        
    }
})