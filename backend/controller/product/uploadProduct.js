// const uploadProductPermission = require("../../helpers/permission")
// const productModel = require("../../models/productModel")

// async function UploadProductController(req,res){
//     try{
//         const sessionUserId = req.userId

//         if(!uploadProductPermission(sessionUserId)){
//             throw new Error("Permission denied")
//         }
    
//         const uploadProduct = new productModel(req.body)
//         const saveProduct = await uploadProduct.save()

//         res.status(201).json({
//             message : "Product upload successfully",
//             error : false,
//             success : true,
//             data : saveProduct
//         })

//     }catch(err){
//         res.status(400).json({
//             message : err.message || err,
//             error : true,
//             success : false
//         })
//     }
// }

// module.exports = UploadProductController

const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function UploadProductController(req, res) {
    try {
        const sessionUserId = req.userId

        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied")
        }

        const {
            productName,
            brandName,
            category,
            productImage,
            description,
            price,
            sellingPrice
        } = req.body

        // 🔥 VALIDATION (YOU WERE MISSING THIS)
        if (!productName || !brandName || !category) {
            throw new Error("Missing required fields")
        }

        if (!productImage || !Array.isArray(productImage) || productImage.length === 0) {
            throw new Error("Product images are required")
        }

        // 🚨 Check if images are valid URLs (VERY IMPORTANT)
        const invalidImages = productImage.filter(img => !img || typeof img !== "string")

        if (invalidImages.length > 0) {
            throw new Error("Invalid image data received")
        }

        const newProduct = new productModel({
            productName,
            brandName,
            category,
            productImage,
            description,
            price,
            sellingPrice
        })

        const savedProduct = await newProduct.save()

        res.status(201).json({
            message: "Product uploaded successfully",
            error: false,
            success: true,
            data: savedProduct
        })

    } catch (err) {
        console.error("Upload Product Error:", err)

        res.status(400).json({
            message: err.message || "Something went wrong",
            error: true,
            success: false
        })
    }
}

module.exports = UploadProductController