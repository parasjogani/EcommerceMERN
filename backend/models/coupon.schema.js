import mongoose from "mongoose";

const couponSchema = mongoose.Schema(
    {
        code: {
            type: String,
            required: [true, "Please provide coupon name"],
            uppercase: true,
            required: true
        },
        discount: {
            type: Number,
            default: 0,
            required: true
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Coupon", couponSchema);