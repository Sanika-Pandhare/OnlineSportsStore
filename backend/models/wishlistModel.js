const mongoose = require("mongoose")

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    }
}, { timestamps: true })

// 🔥 CRITICAL (prevents duplicates)
wishlistSchema.index({ userId: 1, productId: 1 }, { unique: true })

module.exports = mongoose.model("wishlist", wishlistSchema)