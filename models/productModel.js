import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    //category already bana hua hai use ham get kar  rha he hai
    category: {
        type: mongoose.ObjectId,
        ref: "Category",      //category model me jo name export kiya gaya hai
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    photo: {
        data: Buffer,   //store photo
        contentType: String,
    },
    //status
    shipping: {
        type: Boolean
    }

}, { timeStamps: true })



export default mongoose.model("Products", productSchema);








