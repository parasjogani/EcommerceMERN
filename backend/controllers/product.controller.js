import Product from "../models/product.schema.js"
import formidable from "formidable"
import fs from "fs"
import {s3FileDelete, s3FileUpload} from "../services/imageUpload.js"
import Mongoose from "mongoose"
import asyncHandler from "../services/asyncHandler.js"
import CustomError from "../utils/customError.js"
import config from "../config/index.js"

/**********************************************
 * @ADD_PRODUCT
 * @route https://localhost:5000/api/product
 * @description Controller user for creating a new product
 * @description Only admin can create the coupon
 * @description Uses AWS S3 Bucket for image upload
 * @returns Product Object
 **********************************************/

export const addProduct = asyncHandler(async (req, res) => {
    const form = formidable({
        multiples: true,
        keepExtensions: true
    })

    form.parse(req, async function(err, fields, files){
        try {
            if (err) {
                throw new CustomError("Something went wrong", 500)
            }
            let productId = new Mongoose.Types.ObjectId().toHexString()

            if (!fields.name || !fields.price || !fields.description || !fields.collectionId) {
                throw new CustomError("All details must required", 500)
            }
            
            //handling images
            let imgArrayResp = Promise.all(
                Object.keys(files).map(async (filekey, index) => {
                    const element = files[filekey]

                    const data = fs.readFileSync(element.filepath)

                    const upload = await s3FileUpload({
                        bucketName: config.S3_BUCKET_NAME,
                        key: `products/${productId}/photo_${index + 1}.png`,
                        body: data,
                        contentType: element.mimetype
                    })
                    return{
                        secure_url: upload.Location
                    }
                })
            )
            let imgArray = await imgArrayResp;

            const product = await Product.create({
                _id: productId,
                photos: imgArray,
                ...fields
            })

            if (!product) {
                throw new CustomError("Product was not created", 400)
            }
            res.status(200).json({
                success: true,
                product
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message || "Something went wrong"
            })
        }
    })
})

/**********************************************
 * @GET_ALL_PRODUCT
 * @route https://localhost:5000/api/product
 * @description Controller used for getting all products details
 * @description User and admin can get all the products
 * @returns Product Object
 **********************************************/

export const getAllProducts = asyncHandler(async (req, res) => {
    const queryObj = {...req.query}
    const products = await Product.find(queryObj)

    if (!products) {
        throw new CustomError("Product was not found", 404)
    }
    res.status(200).json({
        success: true,
        products
    })
})

/**********************************************
 * @GET_PRODUCT_BY_ID
 * @route https://localhost:5000/api/product
 * @description Controller used for getting single product details
 * @description User and admin can get single product detail
 * @returns Product Object
 **********************************************/

export const getProductById = asyncHandler(async (req, res) => {
    const {id: productId} = req.params
    const product = await Product.findById(productId)

    if (!product) {
        throw new CustomError("Product was not found", 404)
    }
    res.status(200).json({
        success: true,
        product
    })
})

/**********************************************
 * @UPDATE_PRODUCT
 * @route https://localhost:5000/api/product/
 * @description Controller used for updating value of product
 * @description User and admin can update value of product
 * @returns Product Object
 **********************************************/

export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true
    })

    if (!updateProduct) {
        throw new CustomError("Product not found", 400)
    }

    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        updateProduct
    })

})

/**********************************************
 * @UPDATE_PRODUCT
 * @route https://localhost:5000/api/product/
 * @description Controller used for updating value of product
 * @description User and admin can update value of product
 * @returns Product Object
 **********************************************/

export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    const deletedProduct = await Product.findByIdAndDelete(id)

    if (!deletedProduct) {
        throw new CustomError("Product not found", 400)
    }

    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        deletedProduct
    })

})