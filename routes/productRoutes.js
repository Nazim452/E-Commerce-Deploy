import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';



import {
    allUsersController,
    brainTreePaymentController,
    braintreeTokenController,
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    productCategoryController,
    productCountController,
    productFiltersController,
    productListController,
    productPhotoController,
    relatedProductController,
    searchProductController,
    updateProductController,
   
} from '../controllers/productController.js';
import formidable from 'express-formidable'
const router = express.Router();



router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//getProduct

router.get('/get-product', getProductController)

//get - Single Product

router.get('/get-product/:slug', getSingleProductController)
//get-photo
//pid - prodcut id
router.get('/product-photo/:pid', productPhotoController)

//delete product
router.delete('/delete-product/:pid', deleteProductController)

//update produt
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

//filter-product
router.post('/product-filters', productFiltersController)


//Total product-count - 
router.get('/product-count', productCountController)

//product per page
router.get('/product-list/:page', productListController)

//search-product
router.get('/search/:keyword', searchProductController)

//similar-product
//cid - category id
router.get('/related-product/:pid/:cid',relatedProductController)


//categoryWise product
router.get('/product-category/:slug',productCategoryController)

//payment routes  - braintree pakage provide a token

router.get('/braintree/token',braintreeTokenController)

//payment
router.post('/braintree/payment', requireSignIn,brainTreePaymentController)

//all user
router.get('/users',requireSignIn, isAdmin, allUsersController)

export default router;

