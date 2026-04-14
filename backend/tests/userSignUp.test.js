const userSignUpController = require('../controller/user/userSignUp')
const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')

// ✅ Mock dependencies
jest.mock('../models/userModel')
jest.mock('bcryptjs')

describe('userSignUpController', () => {

  let req, res

  beforeEach(() => {
    req = {
      body: {
        email: 'test@gmail.com',
        password: '123456',
        name: 'sanika'
      }
    }

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
  })

  // ❌ User already exists
  test('should return error if user already exists', async () => {
    userModel.findOne.mockResolvedValue({ email: 'test@gmail.com' })

    await userSignUpController(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "Already user exits."
      })
    )
  })

  // ❌ Missing email
  test('should return error if email missing', async () => {
    req.body.email = ''
    userModel.findOne.mockResolvedValue(null)

    await userSignUpController(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

  // ❌ Missing password
  test('should return error if password missing', async () => {
    req.body.password = ''
    userModel.findOne.mockResolvedValue(null)

    await userSignUpController(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

  // ❌ Missing name
  test('should return error if name missing', async () => {
    req.body.name = ''
    userModel.findOne.mockResolvedValue(null)

    await userSignUpController(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

  // ✅ Success
  test('should create user successfully', async () => {
    userModel.findOne.mockResolvedValue(null)

    bcrypt.genSaltSync.mockReturnValue('salt')
    bcrypt.hashSync.mockReturnValue('hashedPassword')

    const mockSave = jest.fn().mockResolvedValue({
      email: 'test@gmail.com',
      name: 'sanika'
    })

    userModel.mockImplementation(() => ({
      save: mockSave
    }))

    await userSignUpController(req, res)

    expect(bcrypt.hashSync).toHaveBeenCalled()

    expect(res.status).toHaveBeenCalledWith(201)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: "User created Successfully!"
      })
    )
  })

})