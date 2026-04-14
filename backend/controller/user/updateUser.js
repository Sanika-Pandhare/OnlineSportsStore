const userModel = require("../../models/userModel")

async function updateUser(req, res) {
    try {
        const sessionUser = req.userId
        const { userId, email, name, role } = req.body

        if (!userId) {
            throw new Error("User ID required")
        }

        const user = await userModel.findById(sessionUser)

        if (!user) {
            throw new Error("Session user not found")
        }

        // ✅ authorization check
        if (user.role !== "ADMIN") {
            throw new Error("Unauthorized")
        }

        const payload = {
            ...(email && { email }),
            ...(name && { name }),
            ...(role && { role }),
        }

        if (Object.keys(payload).length === 0) {
            throw new Error("No data to update")
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            payload,
            { new: true }
        )

        if (!updatedUser) {
            throw new Error("User not found")
        }

        res.json({
            data: updatedUser,
            message: "User Updated",
            success: true,
            error: false
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = updateUser