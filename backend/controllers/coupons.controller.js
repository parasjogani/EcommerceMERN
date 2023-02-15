import Coupon from "../models/coupon.schema.js"
import asyncHandler from "../services/asyncHandler.js"
import CustomError from "../utils/customError.js"

/**********************************************************
 * @CREATE_COUPON
 * @route https://localhost:5000/api/coupon
 * @description Controller used for creating a new coupon
 * @description Only admin and Moderator can create the coupon
 * @returns Coupon Object with success message "Coupon Created SuccessFully"
 *********************************************************/

export const createCoupon = asyncHandler(async (req, res) => {
    const { code, discount } = req.body

    if (!code && !discount) {
        throw new CustomError("Both fields must required", 400)
    }

    const couponExist = await Coupon.findOne({ code })
    if (couponExist) {
        throw new CustomError("Coupon already exists", 400)
    }

    const newCoupon = await Coupon.create({
        code,
        discount
    })
    res.status(200).json({
        success: true,
        message: "Coupon created successfully",
        newCoupon
    })

})

/**********************************************************
 * @DEACTIVATE_COUPON
 * @route https://localhost:5000/api/coupon/deactive/:couponId
 * @description Controller used for deactivating the coupon
 * @description Only admin and Moderator can update the coupon
 * @returns Coupon Object with success message "Coupon Deactivated SuccessFully"
 *********************************************************/

export const deactivateCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params

    const deactivatedCoupon = await Coupon.findByIdAndUpdate(id, {
        active: false
    },
        {
            new: true
        }
    )

    res.status(200).json({
        success: true,
        message: "Coupon deactivated successfully",
        deactivatedCoupon
    })
})

/**********************************************************
 * @DELETE_COUPON
 * @route https://localhost:5000/api/coupon/:couponId
 * @description Controller used for deleting the coupon
 * @description Only admin and Moderator can delete the coupon
 * @returns Success Message "Coupon Deleted SuccessFully"
 *********************************************************/

export const deleteCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params

    const deletedCoupon = await Coupon.findByIdAndDelete(id)

    res.status(200).json({
        success: true,
        message: "Coupon deleted successfully",
        deletedCoupon
    })
})

/**********************************************************
 * @GET_ALL_COUPONS
 * @route https://localhost:5000/api/coupon
 * @description Controller used for getting all coupons details
 * @description Only admin and Moderator can get all the coupons
 * @returns allCoupons Object
 *********************************************************/

export const getAllCoupons = asyncHandler(async (req, res) => {

    const allCoupon = await Coupon.find({})

    res.status(200).json(
        allCoupon
    )
})