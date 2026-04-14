const userDetailsController = require('../controller/user/userDetails')
const userModel = require('../models/userModel')

jest.mock('../models/userModel')

describe('userDetailsController', () => {

  let req, res

  beforeEach(() => {
    req = {
      userId: '123'
    }

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
  })

  // ❌ user not found
  test('should return error if user not found', async () => {
    userModel.findById.mockResolvedValue(null)

    await userDetailsController(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

  // ✅ success
  test('should return user details', async () => {
    userModel.findById.mockResolvedValue({
      _id: '123',
      email: 'test@gmail.com'
    })

    await userDetailsController(req, res)

    expect(res.status).toHaveBeenCalledWith(200)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true
      })
    )
  })

})