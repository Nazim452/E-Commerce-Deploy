import { comparePassword } from './../helpers/authHelper.js';
import userModel from '../models/userModel.js'
import bcrypt, { compare } from "bcrypt";
import Jwt from 'jsonwebtoken';
import orderModel from '../models/orderModel.js';


export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address,answer} = req.body;

        //validation
        if (!name || !email || !password || !phone || !address||!answer) {
            return res.send({
                error: "All fields are required"
            })
        }

        //check-existing user

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "User already exists"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // const hashPassword = await hashPassword(password)
        //save
        const user = await new
            userModel({
                name,
                email,
                phone,
                address,
                password: hashPassword,
                answer
            }).save();

        res.status(201).send({
            success: true,
            message: "User Register successfully",

            user
        })

    } catch (error) {
        //console.log("Error in registerController ", error);
        res.status(500).send({
            success: false,
            message: "Error in registerController",
            error,
        })

    }
}


export const loginController = async (req, res) => {
    try {

        const { email, password } = req.body;

        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        //check user exist or not

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not Registered",

            })
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(404).send({
                success: false,
                message: "Invalid password",
            })
        }

        //token

        const token = await Jwt.sign({ _id: user._id },
            process.env.JWT_SECRET,

            { expiresIn: "7d" }

        )
        res.status(200).send({
            success:true,
            message:"Login successfully",
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role:user.role,

            },
            token

        })


    } catch (error) {
        //console.log("Error in LoginController ", error);
        res.status(500).send({
            success: false,
            message: "Error in LoginController",
            error,
        })

    }
}


export const testController= async(req,res)=>{
    //console.log("Protected Route");
    res.send("Protected Route")
}


// export const forgotPasswordController = async(req,res)=>{
//     try {

//         const {email,answer,newPasword} = req.body;
//         if(!email||!answer||!newPasword){
//             return res.status(400).send({
//                 message:"All fields are required",
                
//             })
//         }
//         //check
//         const user = await  userModel.findOne({email,answer})
//         //validation
//         if(!user){
//             return res.status(400).send({
//                 success:false,
//                 message:"Wrong Email or Answer"
//             })
//         }

//         const saltRounds =10;
//         const hashedPassword = await bcrypt.hash(newPasword,saltRounds);

//         // ab  hame pass ko update karn ahi - for update it will take 2 parameter kis basis per update karna hai aur kise update karna hai
//         await userModel.findByIdAndUpdate(user._id,{password:hashedPassword})
//         res.status(200).send({
//             success: true,
//             message:"Paassword Reset successfully"
//         })

        
//     } catch (error) {
//         //console.log("Error in ForgetPasswordController ", error);
//         res.status(500).send({
//             success: false,
//             message: "Error in ForgetPasswordController",
//             error,
//         })
        
//     }

// }
export const forgotPasswordController = async (req, res) => {
    try {
      const { email, answer, newPassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "Emai is required" });
      }
      if (!answer) {
        res.status(400).send({ message: "answer is required" });
      }
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }
      //check
      const user = await userModel.findOne({ email, answer });
      //validation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
      const saltRounds =10;
      const hashedPassword = await bcrypt.hash(newPassword,saltRounds);
      await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      //console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };
  


  //update Profile


export const updateProfileController = async(req,res)=>{
    try {

        const {name,email,password,address,phone} = req.body;
        const user = await userModel.findById(req.user._id);
        //password 
        if(password&&password.length<6){
            return res.json({error:"Password is required & Should be 6 character long"});
        }
        const saltRounds =10;
        const hashedPassword = password? await bcrypt.hash(password,saltRounds):undefined
        

        const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{
            //agar new name aaya to wo dalo naho to previous wala name rahega
            name:name||user.name,
            password:hashedPassword||user.password,
            phone:phone||user.phone,
            address:address||user.address,


        },{new:true})
        res.status(200).send({
            success:true,
            message:"Profile updated successfully",
            updatedUser
        })

        
    } catch (error) {
        //console.log("Error in updateProfileController", error);
        res.status(500).send({
            success: false,
            message: "Error in updateProfileController",
            error,
        })
        
    }
}



//orders

export const getOrderController = async(req,res)=>{
    try {
        const orders = await orderModel
        .find({buyer:req.user._id})
        .populate("products", "-photo")
        .populate("buyer","name")

        res.json(orders)
      
    } catch (error) {
      //console.log("Error in getOrderController ", error);
      res.status(500).send({
          success: false,
          message: "Error in getOrderController",
          error,
      })
      
    }
  }



  //all orders

  
export const getAllOrderController = async(req,res)=>{
    try {
        const orders = await orderModel
        .find()
        .populate("products", "-photo")
        .populate("buyer","name")
        .sort({createdAt:-1})

        res.json(orders)
      
    } catch (error) {
      //console.log("Error in getAllOrderController ", error);
      res.status(500).send({
          success: false,
          message: "Error in getAllOrderController",
          error,
      })
      
    }
  }


  export const orderStatusController = async(req,res)=>{
    try {
        //need teo things for update status - orderId,status

        const {orderId} = req.params;
        const {status} = req.body;

        const orders = await orderModel.findByIdAndUpdate(
            orderId,
            {status},
            {new:true}
        );
        res.json(orders);
        
    } catch (error) {
        //console.log("Error in orderStatusController ", error);
        res.status(500).send({
            success: false,
            message: "Error in orderStatusController",
            error,
        })
        
    }
  }



//user List controller

