const userSignInController = require('../controller/user/userSignIn')
const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// ✅ Mock dependencies
jest.mock('../models/userModel')
jest.mock('bcryptjs')
jest.mock('jsonwebtoken')

describe('userSignInController', () => {

  let req, res

  beforeEach(() => {
    req = {
      body: {
        email: 'test@gmail.com',
        password: '123456'
      }
    }

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn()
    }

    // ✅ ENV fix (important)
    process.env.TOKEN_SECRET_KEY = 'testsecret'
  })

  // ✅ 1. Missing email
  test('should return error if email missing', async () => {
    req.body.email = ''

    await userSignInController(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

  // ✅ 2. Missing password (NEW TEST 🔥)
  test('should return error if password missing', async () => {
    req.body.password = ''

    await userSignInController(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

  // ✅ 3. User not found
  test('should return error if user not found', async () => {
    userModel.findOne.mockResolvedValue(null)

    await userSignInController(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

  // ✅ 4. Wrong password
  test('should return error if password incorrect', async () => {
    userModel.findOne.mockResolvedValue({
      _id: '1',
      email: 'test@gmail.com',
      password: 'hashed'
    })

    bcrypt.compare.mockResolvedValue(false)

    await userSignInController(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

  // ✅ 5. Successful login
  test('should login successfully', async () => {
    userModel.findOne.mockResolvedValue({
      _id: '1',
      email: 'test@gmail.com',
      password: 'hashed'
    })

    bcrypt.compare.mockResolvedValue(true)
    jwt.sign.mockReturnValue('fakeToken')

    await userSignInController(req, res)

    // ✅ check token created
    expect(jwt.sign).toHaveBeenCalled()

    // ✅ check cookie
    expect(res.cookie).toHaveBeenCalledWith(
      'token',
      'fakeToken',
      expect.objectContaining({
        httpOnly: true
      })
    )

    expect(res.status).toHaveBeenCalledWith(200)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true
      })
    )
  })

})