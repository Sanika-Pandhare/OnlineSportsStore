const productModel = require("../../models/productModel")
const uploadProductPermission = require("../../helpers/permission")

async function deleteProductController(req, res) {
    try {
        const sessionUserId = req.userId

        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied")
        }

        const { productId } = req.body

        if (!productId) {
            throw new Error("Product ID is required")
        }

        const deletedProduct = await productModel.findByIdAndDelete(productId)

        if (!deletedProduct) {
            throw new Error("Product not found")
        }

        res.json({
            message: "Product deleted successfully",
            success: true,
            error: false
        })

    } catch (err) {
        console.error("Delete Product Error:", err)

        res.status(400).json({
            message: err.message || "Something went wrong",
            success: false,
            error: true
        })
    }
}

module.exports = deleteProductController