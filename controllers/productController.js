// import slugify from "slugify";
// import productModel from "../models/productModel.js";
// import fs from 'fs'


// export const createProductController = async (req, res) => {
//     try {
//         const { name, slug, description, price, category, quantity, shipping } = req.fields   //here instead of  body fields is written beacuse we //import formidable from 'express-formidable' in productRoute. This paclkaege help to fetch photo.... that have in our productModel;
//         const { photo } = req.files;

//         if (!name || !description || !category || !quantity || !price) {
//             return res.status(500).send({
//                 success: false,
//                 error: "All fields are required"
//             })
//         }
//         if (photo && photo.size > 1000000) {
//             return res.status(500).send({
//                 success: false,
//                 error: "Photo is required & should be less than 1mb"
//             })

//         }

//         const products = new productModel({ ...req.fields, slug: slugify(name) });
//         if (photo) {
//             products.photo.data = fs.readFileSync(photo.path);
//             products.photo.contentType = photo.type;
//         }
//         await products.save();
//         res.status(201).send({
//             success: true,
//             message: "Product created successfully",
//             products
//         })

//     } catch (error) {
//         //console.log("Error in createProductController", error);
//         res.status(500).send({
//             success: false,
//             message: "Error in createProductController",
//             error: error,
//         })

//     }
// }



// export const getProductController = async (req, res) => {
//     try {
//         //initially photo ko nahi fetch karn hai isse application ko load lene me jyada time lagega
//         //At once time only 12 photo;
//         //jo pahle create hua ha o wo pahle show hoga
//         const products = await productModel
//             .find({})
//             .populate('category')
//             .select("-photo")

//             .limit(12)
//             .sort({ createdAt: -1 });
//         res.status(200).send({
//             success: true,
//             totalproduct: products.length,
//             message: "All Products got successfully",
//             products,
//         })


//     } catch (error) {
//         //console.log("Error in getProductController", error);
//         res.status(500).send({
//             success: false,
//             message: "Error in getProductController",
//             error: error,
//         })


//     }
// }

// //get Single product

// export const getSingleProductController = async (req, res) => {
//     try {
//         const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category")
//         res.status(200).send({
//             success: true,
//             message: "Single Product fetched successfully",
//             product
//         })

//     } catch (error) {
//         //console.log("Error in getSingleProductController", error);
//         res.status(500).send({
//             success: false,
//             message: "Error in getSingleProductController",
//             error: error,
//         })

//     }
// }



// export const productPhotoController = async (req, res) => {
//     try {
//         const product = await productModel.findById(req.params.pid).select("photo");
//         if (product.photo.data) {
//             res.set("Content-type", product.photo.contentType);

//             return res.status(200).send(
//                 product.photo.data

//             )
//         }

//     } catch (error) {
//         //console.log("Error in productPhotoController", error);
//         res.status(500).send({
//             success: false,
//             message: "Error in productPhotoController",
//             error: error,
//         })

//     }
// }



// export const deleteProductController = async (req, res) => {
//     try {
//         await productModel.findByIdAndDelete(req.params.pid).select("-photo")
//         res.status(200).send({
//             success: true,
//             message: "Product deleted successfully",
//         })

//     } catch (error) {
//         //console.log("Error in deleteProductController", error);
//         res.status(500).send({
//             success: false,
//             message: "Error in deleteProductController",
//             error: error,
//         })

//     }
// }


// export const updateProductController = async (req, res) => {
//     try {
//         const { name, description, price, category, quantity, shipping } = req.fields   //here instead of  body fields is written beacuse we //import formidable from 'express-formidable' in productRoute. This paclkaege help to fetch photo.... that have in our productModel;
//         const { photo } = req.files;

//         if (!name || !description || !category || !quantity || !price) {
//             return res.status(500).send({
//                 success: false,
//                 error: "All fields are required"
//             })
//         }
//         if (photo && photo.size > 1000000) {
//             return res.status(500).send({
//                 success: false,
//                 error: "Photo is required & should be less than 1mb"
//             })

//         }

//         const products = await productModel.findByIdAndUpdate(req.params.pid,
//             { ...req.fields, slug: slugify(name) }, { new: true })
//         if (photo) {
//             products.photo.data = fs.readFileSync(photo.path);
//             products.photo.contentType = photo.type;
//         }
//         await products.save();
//         res.status(201).send({
//             success: true,
//             message: "Product updated successfully",
//             products
//         })

//     } catch (error) {
//         //console.log("Error in updateProductController", error);
//         res.status(500).send({
//             success: false,
//             message: "Error in updateProductController",
//             error: error,
//         })

//     }
// }



// export const productFilterController = async (req, res) => {
//     try {

//         const { checked, radio } = req.body;
//         //args me yevalue rahega ki konsa checked box ya phir konsa radio button checked hai----
//         let args = {};
//         if (checked.length > 0) args.category = checked;
//         //radio button me  array pass hai [0-20] toham yahan 0-20 tak ka price find karne ko productmodel me request send kar rahe hai
//         if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
//         const products = await productModel.find(args);
//         res.status(200).send({
//             success: true,
//             products
//         })

//     } catch (error) {
//         //console.log("Error in productFilterController", error);
//         res.status(500).send({
//             success: false,
//             message: "Error in productFilterController",
//             error: error,
//         })


//     }
// }



// // export const productCountController = async (req, res) => {
// //     try {
// //         //estimatedDocumentCount - give toatal count presetn in our documetn
// //         const total = await productModel.find({}).estimatedDocumentCount();

// //         res.status(200).send({
// //             success: true,
// //             total
// //         })

// //     } catch (error) {
// //         //console.log("Error in productCountController", error);
// //         res.status(500).send({
// //             success: false,
// //             message: "Error in productCountController",
// //             error: error,
// //         })

// //     }
// // }



// // //product list based on page

// // export const productListController = async (req, res) => {
// //     try {
// //         const perpage = 3;
// //         //default page 1 rahega
// //         const page = req.params.page ? req.params.page : 1;
// //         // select("-photo") - photo select naho hoga
// //         //createdAt:-1  - jo pahle create hua wo pahle show hoga
// //         const products = await productModel
// //             .find({}).select("-photo")
// //             .skip((page - 1) * perpage)
// //             .limit(perpage)
// //             .sort({ createdAt: -1 })

// //         res.status(200).send({
// //             success:true,
// //             products,
// //         })

// //     } catch (error) {
// //         //console.log("Error in productListController", error);
// //         res.status(500).send({
// //             success: false,
// //             message: "Error in productListController",
// //             error: error,
// //         })

// //     }
// // }






// // product count
// export const productCountController = async (req, res) => {
//     try {
//       const total = await productModel.find({}).estimatedDocumentCount();
//       res.status(200).send({
//         success: true,
//         total,
//       });
//     } catch (error) {
//       //console.log(error);
//       res.status(400).send({
//         message: "Error in product count",
//         error,
//         success: false,
//       });
//     }
//   };

//   // product list base on page
//   export const productListController = async (req, res) => {
//     try {
//       const perPage = 3;
//       const page = req.params.page ? req.params.page : 1;
//       const products = await productModel
//         .find({})
//         .select("-photo")
//         .skip((page - 1) * perPage)
//         .limit(perPage)
//         .sort({ createdAt: -1 });
//       res.status(200).send({
//         success: true,
//         products,
//       });
//     } catch (error) {
//       //console.log(error);
//       res.status(400).send({
//         success: false,
//         message: "error in per page ctrl",
//         error,
//       });
//     }
//   };










import userModel from '../models/userModel.js'

import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from 'dotenv';

dotenv.config();
//Payment GateWay

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});








export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !photo:
        return res
          .status(500)
          .send({ error: "photo is Required " });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      //   .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};
// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

// get photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

// GPT
// export const productPhotoController = async (req, res) => {
//   try {
//     const product = await productModel.findById(req.params.pid).select("photo");
//     if (product && product.photo && product.photo.data) {
//       res.set("Content-type", product.photo.contentType);
//       return res.status(200).send(product.photo.data);
//     } else {
//       return res.status(404).send({
//         success: false,
//         message: "Photo not found",
//       });
//     }
//   } catch (error) {
//     //console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while getting photo",
//       error,
//     });
//   }
// };


//delete controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate producta
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

// filters
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    //console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    //console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 12;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    //console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};





//search product
//$options:i - Making casse insensitive
//$regex:keyword - searching based on keyword
//$or - ya to name aa jaye tab ya description se match ho jaye use show karna hai
// export const searchProductController= async(req,res)=>{
//   try {
//     const {keyword} = req.params;
//     const results = await productModel.find({
//       $or:[
//         {name:{$regex:keyword, $options:"i"}},
//         {description:{$regex:keyword, $options:"i"}}

//       ]
//     }).select("-photo")
//     res.json(results)


//   } catch (error) {
//     //console.log("Error in per search ctrl",error);
//     res.status(400).send({
//       success: false,
//       message: "error in per search ctrl",
//       error,
//     });


//   }
// }



export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    //console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};



// export const relatedProductController = async(req,res)=>{
//   try {

//     const {pid,cid} = req.params;
//     const products = await productModel.find({
//       category:cid,
//       //user jis product ko search  kiya hai use similar product me nahi aane dena hai , use chhorake uske categoryka remianing hame dikhan hai ne - not included
//       _id:{ne:pid}

//     }).select("-photo").populate("category");

//     res.status(400).send({
//       success:true,
//       products
//     })

//   } catch (error) {
//     //console.log("Error in relatedProductController",error);
//     res.status(400).send({
//       success: false,
//       message: "Error In relatedProductController Product",
//       error,
//     });

//   }

// }


export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })


      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    //console.log("Error un productController", error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};



//get product by category

export const productCategoryController = async (req, res) => {
  try {

    //first find category

    const category = await categoryModel.findOne({ slug: req.params.slug })

    //based on category find product - prodcut is array isliye find----

    const products = await productModel.find({ category }).populate('category')
    res.status(200).send({
      success: true,
      category,
      products
    })

  } catch (error) {
    //console.log("Error un productCategoryController", error);
    res.status(400).send({
      success: false,
      message: "error while productCategoryController",
      error,
    });

  }
}


//payment gateway - token

// export const braintreeTokenController = async (req, res) => {
//   try {
//      //gateway jo hamne upar me banay hai token usme se milega
//     //according to diocumentatio
//     gateway.clientToken.generate({},function(err,response){
//       if(err){
//         res.status(500).send(err);
//       }
//       else{
//         res.send(response);

//       }
//     })

//   } catch (error) {
//     //console.log("Error un braintreeTokenController", error);
//     res.status(400).send({
//       success: false,
//       message: "error while braintreeTokenController",
//       error,
//     });

//   }
// }
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    //console.log(error);
  }
};



//payment


// export const brainTreePaymentController = async(req,res)=>{
//   try {
//     //nonce - according to braintree documentation,
//     const{cart,nonce} = req.body;
//     let total = 0;
//     cart.map((i)=>{
//       total+=i.price;
//     })

//     let newTransaction = gateway.transaction.sale({
//       amount:total,
//       paymentMethodNonce:nonce,
//       options:{
//         submitForSettlement:true,
//       }
//     },
//     function(err,result){
//       if(result){
//         const order = new orderModel({
//           products:cart,
//           payment:result,
//           buyer:req.user._id
//         }).save();
//         res.json({ok:true})
//       }
//       else{
//         res.status(500).send(error)
//       }

//     }
    
//     )


   
    
//   } catch (error) {
//     //console.log("Error un brainTreePaymentController", error);
//     res.status(400).send({
//       success: false,
//       message: "error while brainTreePaymentController",
//       error,
//     });
    
//   }
// }


//payment
export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    //console.log(error);
  }
};






export const allUsersController = async(req,res)=>{
  try {
      // Fetch all users from the database
      const users = await userModel.find({}, { name: 1 });
      
  
      // Extract user names
      // const userNames = users.map(user => user.name);
  
      // Return user names
      res.status(200).json({ users });
    } catch (error) {
      //console.log("Error in alluserConteoller",error);
      res.status(500).json({ message: error.message });
    }

    
  
}


export const makeAdmin = async(req,res)=>{
  

}


