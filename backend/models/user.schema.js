import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles"
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from "crypto";

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
            match: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, //checks at least one char, one number and one special char.
            select: false
        },
        role: {
            type: String,
            enum: Object.values(AuthRoles),
            default: AuthRoles.USER
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
    if (!this.modified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

export default mongoose.model("User", userSchema)