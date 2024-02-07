import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";




export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(401).send({ message: "Name is required" })
        }
        const existingCategory = await categoryModel.findOne({ name });

        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category already exists",
            })
        }

        //save in DB
        //slugify- if category name ke bich me space haito wo space '-' me badal jayega

        const category = await new categoryModel({ name, slug: slugify(name) }).save();
        res.status(201).send({
            success: true,
            message: "Category Created",
            category,
        })


    } catch (error) {
        //console.log("Error in createCategoryController", error);
        res.status(500).send({
            success: false,
            message: "Error in createCategoryController",
            error,
        })


    }
}


//update category

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const category = await categoryModel.findByIdAndUpdate(id,
            { name, slug: slugify(name) },
            { new: true }      //update category return karega
        );

        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category,
        })

    } catch (error) {
        //console.log("Error in updateCategoryCOntroller", error);
        res.status(500).send({
            success: false,
            message: "Error in updateCategoryCOntroller",
            error: error,
        })

    }
}



//get All category controller
export const categoryController = async (req, res) => {
    try {

        const category = await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:"ALL category LIst fethched successfully",
            category,
        })



    } catch (error) {
        //console.log("Error in categoryController", error);
        res.status(500).send({
            success: false,
            message: "Error in categoryController",
            error: error,
        })

    }

}


export const singleCategoryController = async(req,res)=>{
    try {
        const category = await categoryModel.findOne({slug: req.params.slug});
        res.status(200).send({
            success: true,
            message:"Get single category successfully",
            category,

        })

        
    } catch (error) {
        //console.log("Error in singleCategoryController", error);
        res.status(500).send({
            success: false,
            message: "Error in singleCategoryController",
            error:error,
        })
        
    }
}



export const deleteCategoryController = async(req,res)=>{
    try {
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"Category deleted successfully"
        })
        
    } catch (error) {
        //console.log("Error in deleteCategoryController", error);
        res.status(500).send({
            success: false,
            message: "Error in deleteCategoryController",
            error:error,
        })
        
    }

}


