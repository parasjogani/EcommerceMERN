import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles.js"
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from "crypto";
import config from "../config/index.js";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name must required"],
            maxLength: [50, "Name must be less than 50 character"]
        },
        email: {
            type: String,
            required: [true, "Email must required"],
            unique: true,
            match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },
        password: {
            type: String,
            required: [true, "Password must required"],
            minLength: [8, "password must be at least 8 characters"],
            match: [/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must contain one character, one number and one special character"], //checks at least one char, one number and one special char.
            select: false
        },
        role: {
            type: String,
            enum: Object.values(AuthRoles),
            default: AuthRoles.USER
        },
        isBlocked:{
            type: Boolean,
            default: false
        },
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,
    },
    {
        timestamps: true
    }
);

// encrypt password
userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// add more features to schema
userSchema.methods = {
    // compare password
    comparePassword: async function(enteredPassword){
        return await bcrypt.compare(enteredPassword, this.password)
    },

    // generate JWT token
    getJwtToken: function(){
        return JWT.sign(
            {
                _id: this._id,
                role: this.role
            },
            config.JWT_SECRET,
            {
                expiresIn: config.JWT_EXPIRY
            }
        )
    },

    // generate forgot password token
    generateForgotPasswordToken: function(){
        const forgotToken = crypto.randomBytes(22).toString('hex')

        // save to DB
        this.forgotPasswordToken = crypto
        .createHash("sha256")
        .update(forgotToken)
        .digest("hex")

        this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000

        // return to user
        return forgotToken
    }
}

export default mongoose.model("User", userSchema)