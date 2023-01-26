import Collection from "../models/collection.schema"
import asyncHandler from "../services/asyncHandler"
import CustomError from "../utils/customError"

/**************************************************
 * @Create_Collection
 * @route http://localhost:4000/api/collection
 * @description User create collection
 * @parameters 
 * @return collection
 **************************************************/
export const createCollection = asyncHandler(async (req, res) => {
    const {name} = req.body

    if (!name) {
        throw new CustomError("Collection name is required", 400)
    }

    const collection = await Collection.create({
        name
    })
    res.status(200).json({
        success: true,
        message: "Coolection created successfully",
        collection
    })
})

export const updateCollection = asyncHandler(async (req, res) => {
    const {id: collectionId} = req.params
    
    const {name} = req.body

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
    res.status(200).json({
        success: true,
        message: "Collection updated successfully",
        updatedCollection
    })
})

export const deleteCollection = asyncHandler(async (req, res) => {
    const {id: collectionId} = req.params

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

export const getCollection = asyncHandler(async (req, res) => {
    const collections = await Collection.find()

    if (!collections) {
        throw new CustomError("No collection found", 400)
    }

    res.status(200).json({
        success: true,
        collections
    })
})