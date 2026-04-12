// const razorpay = require('../../config/razorpay.js')

// const createOrder = async (req, res) => {
//     try {
//         const { amount } = req.body

//         const options = {
//             amount: amount * 100, // ₹ to paise
//             currency: "INR",
//             receipt: "order_rcptid_" + Date.now()
//         }

//         const order = await razorpay.orders.create(options)

//         res.json({
//             success: true,
//             order
//         })

//     } catch (error) {
//         res.json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// module.exports = createOrder



const razorpay = require('../../config/razorpay.js')

const createOrder = async (req, res) => {
    try {
        const { amount } = req.body

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: "order_" + Date.now()
        }

        const order = await razorpay.orders.create(options)

        // ✅ FIXED RESPONSE
        res.json(order)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = createOrder