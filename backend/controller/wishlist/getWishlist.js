const wishlistModel = require("../../models/wishlistModel")

const getWishlist = async (req, res) => {
    try {

        const data = await wishlistModel
            .find({ userId: req.userId })   // 🔥 FILTER USER
            .populate("productId")

        res.json({
            success: true,
            data
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = getWishlist