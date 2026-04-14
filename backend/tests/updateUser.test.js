// const updateUser = require('../controller/user/updateUser')
// const userModel = require('../models/userModel')

// jest.mock('../models/userModel')

// describe('updateUserController', () => {

//   let req, res

//   beforeEach(() => {
//     req = {
//       userId: 'admin123',
//       body: {
//         userId: 'target123',
//         email: 'new@gmail.com'
//       }
//     }

//     res = {
//       json: jest.fn(),
//       status: jest.fn().mockReturnThis()
//     }
//   })

//   // ❌ unauthorized user
//   test('should return error if not admin', async () => {
//     userModel.findById.mockResolvedValue({ role: 'USER' })

//     await updateUser(req, res)

//     expect(res.status).toHaveBeenCalledWith(400)
//   })

//   // ❌ user not found
//   test('should return error if target user not found', async () => {
//     userModel.findById.mockResolvedValue({ role: 'ADMIN' })
//     userModel.findByIdAndUpdate.mockResolvedValue(null)

//     await updateUser(req, res)

//     expect(res.status).toHaveBeenCalledWith(400)
//   })

//   // ✅ success
//   test('should update user successfully', async () => {
//     userModel.findById.mockResolvedValue({ role: 'ADMIN' })
//     userModel.findByIdAndUpdate.mockResolvedValue({
//       email: 'new@gmail.com'
//     })

//     await updateUser(req, res)

//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         success: true
//       })
//     )
//   })

// })
const updateUser = require('../controller/user/updateUser')
const userModel = require('../models/userModel')

jest.mock('../models/userModel')

describe('updateUserController', () => {

  let req, res

  beforeEach(() => {
    req = {
      userId: 'admin123',
      body: {
        userId: 'target123',
        email: 'new@gmail.com'
      }
    }

    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    }
  })

  // ❌ not admin
  test('should return error if not admin', async () => {
    userModel.findById.mockResolvedValue({ role: 'USER' })

    await updateUser(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

  // ❌ target user not found
  test('should return error if target user not found', async () => {
    userModel.findById.mockResolvedValue({ role: 'ADMIN' })
    userModel.findByIdAndUpdate.mockResolvedValue(null)

    await updateUser(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
  })

  // ❌ no payload
  test('should return error if no data to update', async () => {
    req.body = { userId: 'target123' }

    userModel.findById.mockResolvedValue({ role: 'ADMIN' })

    await updateUser(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
  })

  // ✅ success
  test('should update user successfully', async () => {
    userModel.findById.mockResolvedValue({ role: 'ADMIN' })
    userModel.findByIdAndUpdate.mockResolvedValue({
      email: 'new@gmail.com'
    })

    await updateUser(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: "User Updated"
      })
    )
  })

})