const wishlistModel = require("../../models/wishlistModel")
const mongoose = require("mongoose")

const toggleWishlist = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userId)
        const productId = new mongoose.Types.ObjectId(req.body.productId)

        const existing = await wishlistModel.findOne({ userId, productId })

        if (existing) {
            await wishlistModel.deleteOne({ userId, productId })

            return res.json({
                success: true,
                message: "Removed from wishlist"
            })
        }

        await wishlistModel.create({ userId, productId })

        return res.json({
            success: true,
            message: "Added to wishlist"
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = toggleWishlist