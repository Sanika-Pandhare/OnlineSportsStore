const orderModel = require('../../models/orderModel')

const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId

        const orders = await orderModel.find({ userId }).sort({ createdAt: -1 })

        res.json({
            success: true,
            data: orders
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports = getUserOrders