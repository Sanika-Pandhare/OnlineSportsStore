// const userModel = require("../../models/userModel")

// async function allUsers(req,res){
//     try{
//         console.log("userid all Users",req.userId)

//         const allUsers = await userModel.find()
        
//         res.json({
//             message : "All User ",
//             data : allUsers,
//             success : true,
//             error : false
//         })
//     }catch(err){
//         res.status(400).json({
//             message : err.message || err,
//             error : true,
//             success : false
//         })
//     }
// }

// module.exports = allUsers


const userModel = require("../../models/userModel")

async function allUsers(req, res) {
    try {
        const currentUserId = req.userId

        if (!currentUserId) {
            throw new Error("User not authenticated")
        }

        const currentUser = await userModel.findById(currentUserId)

        if (!currentUser || currentUser.role !== "ADMIN") {
            throw new Error("Unauthorized")
        }

        const users = await userModel.find()

        res.json({
            message: "All Users",
            data: users,
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

module.exports = allUsers