import axios from "axios"
import { base_url } from "../../utils/baseUrl"
import { config } from "../../utils/axiosConfig"

const getAllCoupon = async () => {
    const response = await axios.get(`${base_url}coupon`, config)

    return response.data
}
const getOneCoupon = async (id) => {
    const response = await axios.get(`${base_url}coupon/${id}`, config)

    return response.data
}

const createCoupon = async (couponData) => {
    const response = await axios.post(`${base_url}coupon`, couponData, config)

    return response.data
}
const deleteCoupon = async (id) => {
    const response = await axios.delete(`${base_url}coupon/${id}`, config)
    return response.data
}
const toggleCoupon = async (id) => {

    const response = await axios.get(`${base_url}coupon/deactive/${id}`, config)

    return response.data
}

const couponService = {
    getAllCoupon,
    createCoupon,
    getOneCoupon,
    deleteCoupon,
    toggleCoupon
}

export default couponService