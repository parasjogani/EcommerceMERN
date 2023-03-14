import axios from "axios"
import { config } from "../../utils/axiosConfig"
import { base_url } from "../../utils/baseUrl"

const getCartProduct = async () => {
    const response = await axios.get(`${base_url}auth/cart`, config)

    return response.data
}

const storeService = {
    getCartProduct
}

export default storeService