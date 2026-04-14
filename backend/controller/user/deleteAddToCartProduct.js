// const addToCartModel = require("../../models/cartProduct")

// const deleteAddToCartProduct = async(req,res)=>{
//     try{
//         const currentUserId = req.userId 
//         const addToCartProductId = req.body._id

//         const deleteProduct = await addToCartModel.deleteOne({ _id : addToCartProductId})

//         res.json({
//             message : "Product Deleted From Cart",
//             error : false,
//             success : true,
//             data : deleteProduct
//         })

//     }catch(err){
//         res.json({
//             message : err?.message || err,
//             error : true,
//             success : false
//         })
//     }
// }

// module.exports = deleteAddToCartProduct



const addToCartModel = require("../../models/cartProduct")

const deleteAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId
        const addToCartProductId = req.body._id

        if (!addToCartProductId) {
            throw new Error("Cart product ID required")
        }

        const deleteProduct = await addToCartModel.deleteOne({
            _id: addToCartProductId,
            userId: currentUserId
        })

        // ✅ ONLY deletedCount here
        if (!deleteProduct || deleteProduct.deletedCount === 0) {
            throw new Error("Product not found in cart")
        }

        res.json({
            message: "Product Deleted From Cart",
            error: false,
            success: true,
            data: deleteProduct
        })

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = deleteAddToCartProduct