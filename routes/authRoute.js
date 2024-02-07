import express from 'express';
//router bject
const router = express.Router();
import {forgotPasswordController, getAllOrderController, getOrderController, loginController, orderStatusController, registerController, testController, updateProfileController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
//routing

//Register ||POST
router.post('/register',registerController);

//Login ||POST

router.post('/login',loginController);

//test
router.get('/test',requireSignIn,isAdmin,testController);

//Protected Route

router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({
        ok:true,
    })
})

//admin-route
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({
        ok:true,
    })
})


router.post('/forgot-password',forgotPasswordController)
//update Profile
router.put('/profile',requireSignIn,updateProfileController)

//orders
router.get('/orders',requireSignIn,getOrderController)
//all orders
router.get('/all-orders',requireSignIn ,isAdmin,getAllOrderController)

//order status update
router.put('/order-status/:orderId',requireSignIn,isAdmin,orderStatusController)



export default router;




