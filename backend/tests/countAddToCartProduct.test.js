const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartModel = require('../models/cartProduct')

// ✅ mock model
jest.mock('../models/cartProduct')

describe('countAddToCartProduct', () => {

  let req, res

  beforeEach(() => {
    req = {
      userId: 'user123'
    }

    res = {
      json: jest.fn()
    }
  })

  // ✅ success
  test('should return count of cart products', async () => {
    addToCartModel.countDocuments.mockResolvedValue(3)

    await countAddToCartProduct(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: { count: 3 }
      })
    )
  })

  // ❌ user missing
  test('should return error if user not found', async () => {
    req.userId = null

    await countAddToCartProduct(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

  // ❌ DB error
  test('should handle database error', async () => {
    addToCartModel.countDocuments.mockRejectedValue(new Error("DB error"))

    await countAddToCartProduct(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

})