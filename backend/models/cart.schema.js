import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
    {
        products: [ 
                {
                    product: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Product"
                    },
                    count: Number,
                    price: Number
                },
        ],
        cartTotal: Number,
        totalAfterDiscount: Number,
        orderby: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Cart", cartSchema)