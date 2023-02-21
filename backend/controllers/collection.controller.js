import Collection from "../models/collection.schema.js"
import asyncHandler from "../services/asyncHandler.js"
import CustomError from "../utils/customError.js"

/**************************************************
 * @Create_Collection
 * @route http://localhost:4000/api/collection
 * @description Admin can create collection
 * @parameters 
 * @return collection
 **************************************************/
export const createCollection = asyncHandler(async (req, res) => {
    const { name } = req.body

    if (!name) {
        throw new CustomError("Collection name is required", 400)
    }

    const collection = await Collection.create({
        name
    })
    res.status(200).json(collection)
})

/**************************************************
 * @Update_Collection
 * @route http://localhost:4000/api/collection
 * @description Admin can update collection
 * @parameters collection id
 * @return collection
 **************************************************/

export const updateCollection = asyncHandler(async (req, res) => {
    const { id: collectionId } = req.params

    const { name } = req.body

    if (!name) {
        throw new CustomError("Collection name is required", 400)
    }

    let updatedCollection = await Collection.findByIdAndUpdate(
        collectionId,
        {
            name
        },
        {
            new: true,
            runValidators: true
        }
    )

    if (!updatedCollection) {
        throw new CustomError("Collection not found", 400)

    }

    //send response to frontend
    res.status(200).json(
        updatedCollection
    )
})

/**************************************************
 * @Delete_Collection
 * @route http://localhost:4000/api/collection
 * @description Admin can delete collection
 * @parameters collection id
 * @return collection
 **************************************************/

export const deleteCollection = asyncHandler(async (req, res) => {
    const { id: collectionId } = req.params

    const deletedCollection = await Collection.findByIdAndDelete(collectionId)

    if (!deletedCollection) {
        throw new CustomError("collection not found", 400)
    }
    deletedCollection.remove()
    //send response to frontend
    res.status(200).json({
        success: true,
        message: "Collection deleted successfully"
    })
})

/**************************************************
 * @Get_Collections
 * @route http://localhost:4000/api/collection
 * @description User and admin can get all collection
 * @parameters 
 * @return collection
 **************************************************/

export const getCollection = asyncHandler(async (req, res) => {
    const collections = await Collection.find()

    if (!collections) {
        throw new CustomError("No collection found", 400)
    }

    res.status(200).json(
        collections
    )
})

/**************************************************
 * @Get_A_Collections
 * @route http://localhost:4000/api/collection/:id
 * @description User and admin can get single collection
 * @parameters collection id
 * @return collection
 **************************************************/

export const getACollection = asyncHandler(async (req, res) => {
    const { id } = req.params
    const collection = await Collection.findById(id)

    if (!collection) {
        throw new CustomError("No collection found", 400)
    }

    res.status(200).json(
        collection
    )
})