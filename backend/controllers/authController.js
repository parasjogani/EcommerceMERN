import User from "../models/user.schema"
import asyncHandler from "../services/asyncHandler"
import CuatomError from "../utils/customError"


export const cookieOption = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 1000),
    httpOnly: true
}

/**************************************************
 * @SIGNUP
 * @route http://localhost:4000/api/auth/signup
 * @description User signUp Controller for creating new user
 * @parameters name, email. password
 * @returns User Object
 **************************************************/

export const signUp = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        throw new CuatomError("Please fill all details", 400)
    }

    //check user already exist or not
    const existingUser = await User.findOne({email})

    if (existingUser) {
        throw new CuatomError("User already exist", 400)
    }

    const user = await User.create({
        name,
        email,
        password
    })

    const token = user.getJwtToken()
    user.password = undefined

    res.cookie("token", token, cookieOption)
    res.status(200).json({
        success: true,
        token,
        user
    })
})