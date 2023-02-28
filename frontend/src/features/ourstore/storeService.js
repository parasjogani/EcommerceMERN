import axios from "axios"
// import { config } from "../../utils/axiosConfig"
import { base_url } from "../../utils/baseUrl"

const getProduct = async () => {
    const response = await axios.get(`${base_url}product`)

    return response.data
}
const storeService = {
    getProduct
}

export default storeService