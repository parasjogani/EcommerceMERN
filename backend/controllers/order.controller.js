import Product from "../models/product.schema"
import Coupon from "../models/coupon.schema"
import Order from "../models/order.schema"
import asyncHandler from "../services/asyncHandler"
import CustomError from "../utils/customError"
import razorpay from "../config/razorpay.config"

/**********************************************************
 * @GENEARATE_RAZORPAY_ID
 * @route https://localhost:5000/api/order/razorpay
 * @description Controller used for genrating razorpay Id
 * @description Creates a Razorpay Id which is used for placing order
 * @returns Order Object with "Razorpay order id generated successfully"
 *********************************************************/

export const generateRazorpayOrderId = asyncHandler(async (req, res) => {

    let totalAmount;

    const options = {
        amount: Math.round(totalAmount * 100),
        currency: "INR",
        receipt: `receipt_${new Date().getTime()}`
    }

    const order = await razorpay.orders.create(options)

    if (!order) {
        throw new CustomError("Order not created", 400)
    }
    res.status(200).json({
        success: true,
        order
    })
})