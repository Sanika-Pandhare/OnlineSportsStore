const addToCartViewProduct = require('../controller/user/addToCartViewProduct')
const addToCartModel = require('../models/cartProduct')

jest.mock('../models/cartProduct')

describe('addToCartViewProduct', () => {

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
  test('should return all cart products', async () => {
    const mockProducts = [{ productId: 'p1' }]

    addToCartModel.find.mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockProducts)
    })

    await addToCartViewProduct(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: mockProducts
      })
    )
  })

  // ❌ user missing
  test('should return error if user not found', async () => {
    req.userId = null

    await addToCartViewProduct(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

  // ❌ DB error
  test('should handle database error', async () => {
    addToCartModel.find.mockReturnValue({
      populate: jest.fn().mockRejectedValue(new Error("DB error"))
    })

    await addToCartViewProduct(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

})