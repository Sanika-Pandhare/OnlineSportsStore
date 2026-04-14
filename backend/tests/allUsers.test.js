const allUsers = require('../controller/user/allUsers')
const userModel = require('../models/userModel')

jest.mock('../models/userModel')

describe('allUsers controller', () => {

  let req, res

  beforeEach(() => {
    req = {
      userId: 'admin123'
    }

    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    }
  })

  // ❌ unauthorized
  test('should return error if not admin', async () => {
    userModel.findById.mockResolvedValue({ role: 'USER' })

    await allUsers(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
  })

  // ❌ user not found
  test('should return error if user not found', async () => {
    userModel.findById.mockResolvedValue(null)

    await allUsers(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
  })

  // ✅ success
  test('should return all users for admin', async () => {
    userModel.findById.mockResolvedValue({ role: 'ADMIN' })
    userModel.find.mockResolvedValue([{ name: 'User1' }])

    await allUsers(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: [{ name: 'User1' }]
      })
    )
  })

})