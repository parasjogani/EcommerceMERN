import axios from "axios"
import { base_url } from "../../utils/baseUrl"
import { config } from "../../utils/axiosConfig"

const getCategory = async () => {
    const response = await axios.get(`${base_url}collection`, config)

    return response.data
}

const createCategory = async (categoryData) => {
    const response = await axios.post(`${base_url}collection`, categoryData, config)

    return response.data
}

const categoryService = {
    getCategory,
    createCategory
}

export default categoryService