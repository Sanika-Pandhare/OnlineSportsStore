const crypto = require('crypto')
const orderModel = require('../../models/orderModel')
const addToCartModel = require('../../models/cartProduct')

const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body

        const userId = req.userId  // from authToken middleware

        const body = razorpay_order_id + "|" + razorpay_payment_id

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest('hex')

        if (expectedSignature === razorpay_signature) {

            // 🔥 1. GET CART DATA
            const cartItems = await addToCartModel.find({ userId })

            // 🔥 2. CREATE ORDER
            const newOrder = new orderModel({
                userId,
                products: cartItems.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity
                })),
                totalAmount: cartItems.reduce(
                    (sum, item) => sum + item.quantity * item.price || 0,
                    0
                ),
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id,
                paymentStatus: "paid"
            })

            await newOrder.save()

            // 🔥 3. CLEAR CART
            await addToCartModel.deleteMany({ userId })

            return res.json({ success: true })

        } else {
            return res.json({ success: false })
        }

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports = verifyPayment