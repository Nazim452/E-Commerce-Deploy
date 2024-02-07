import express from "express";
const router = express.Router();
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js'
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from './../controllers/categoryController.js'

//routes

router.post('/create-category', requireSignIn, isAdmin, createCategoryController)

//update-cateogry
router.put('/update-cateogry/:id', requireSignIn, isAdmin, updateCategoryController)

//getAll categoty
//Whwn user not login then also we have need to show all category
router.get('/get-category',categoryController)

//single category
router.get('/single-category/:slug',singleCategoryController)

//delete category

router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)


export default router;



