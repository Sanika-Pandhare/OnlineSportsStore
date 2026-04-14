const addToCartController = require('../controller/user/addToCartController')
const addToCartModel = require('../models/cartProduct')

jest.mock('../models/cartProduct')

describe('addToCartController', () => {

  let req, res

  beforeEach(() => {
    req = {
      body: {
        productId: 'p1'
      },
      userId: 'user123'
    }

    res = {
      json: jest.fn()
    }
  })

  // ❌ product already exists
  test('should return error if product already in cart', async () => {
    addToCartModel.findOne.mockResolvedValue({ productId: 'p1' })

    await addToCartController(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

  // ❌ missing productId
  test('should return error if productId missing', async () => {
    req.body.productId = ''

    await addToCartController(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

  // ❌ missing user
  test('should return error if user not found', async () => {
    req.userId = null

    await addToCartController(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

  // ✅ success
  test('should add product to cart successfully', async () => {
    addToCartModel.findOne.mockResolvedValue(null)

    const mockSave = jest.fn().mockResolvedValue({
      productId: 'p1'
    })

    addToCartModel.mockImplementation(() => ({
      save: mockSave
    }))

    await addToCartController(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: "Product Added in Cart"
      })
    )
  })

})