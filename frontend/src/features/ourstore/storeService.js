import axios from "axios"
import { config } from "../../utils/axiosConfig"
import { base_url } from "../../utils/baseUrl"

const getProduct = async () => {
    const response = await axios.get(`${base_url}product`, config)

    return response.data
}
const togglewishlist = async (productData) => {
    const response = await axios.post(`${base_url}product/wishlist`, productData, config)

    return response.data
}
const storeService = {
    getProduct,
    togglewishlist
}

export default storeService