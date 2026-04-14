// const addToCartModel = require("../../models/cartProduct")

// const updateAddToCartProduct = async(req,res)=>{
//     try{
//         const currentUserId = req.userId 
//         const addToCartProductId = req?.body?._id

//         const qty = req.body.quantity

//         const updateProduct = await addToCartModel.updateOne({_id : addToCartProductId},{
//             ...(qty && {quantity : qty})
//         })

//         res.json({
//             message : "Product Updated",
//             data : updateProduct,
//             error : false,
//             success : true
//         })

//     }catch(err){
//         res.json({
//             message : err?.message || err,
//             error : true,
//             success : false
//         })
//     }
// }

// module.exports = updateAddToCartProduct


const addToCartModel = require("../../models/cartProduct")

const updateAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId
        const addToCartProductId = req.body._id
        const qty = req.body.quantity

        if (!addToCartProductId) {
            throw new Error("Cart product ID required")
        }

        if (qty === undefined || qty <= 0) {
            throw new Error("Invalid quantity")
        }

        const updateProduct = await addToCartModel.updateOne(
            { _id: addToCartProductId, userId: currentUserId },
            { quantity: qty }
        )

        // ✅ ONLY matchedCount (NOT deletedCount)
        if (!updateProduct || updateProduct.matchedCount === 0) {
            throw new Error("Product not found in cart")
        }

        res.json({
            message: "Product Updated",
            data: updateProduct,
            error: false,
            success: true
        })

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = updateAddToCartProduct