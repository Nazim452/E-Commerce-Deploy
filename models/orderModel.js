import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                type: mongoose.ObjectId,
                ref: "Products",//model name
            },
        ],
        payment: {},
        buyer: {
            type: mongoose.ObjectId,
            ref: "users",//model name
        },
        status: {
            type: String,
            default: "Not Process",
            enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancelled"],
        },
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);