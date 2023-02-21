import axios from "axios"
import { config } from "../../utils/axiosConfig"
import { base_url } from "../../utils/baseUrl"

const getProducts = async () => {
    const response = await axios.get(`${base_url}product`, config)

    return response.data
}

const createProduct = async (productData) => {
    const response = await axios.post(`${base_url}product`, productData, config, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })

    return response.data
}

const deleteProduct = async (id) => {
    const response = await axios.delete(`${base_url}product/${id}`, config)

    return response.data
}

const productService = {
    getProducts,
    createProduct,
    deleteProduct
}

export default productService