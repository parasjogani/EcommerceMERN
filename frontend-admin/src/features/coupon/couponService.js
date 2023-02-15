import axios from "axios"
import { base_url } from "../../utils/baseUrl"
import { config } from "../../utils/axiosConfig"

const getCoupon = async () => {
    const response = await axios.get(`${base_url}coupon`, config)

    return response.data
}

const couponService = {
    getCoupon
}

export default couponService