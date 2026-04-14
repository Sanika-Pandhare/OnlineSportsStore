const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const addToCartModel = require('../models/cartProduct')

// 🔥 mock DB
jest.mock('../models/cartProduct')

describe('updateAddToCartProduct', () => {

  let req, res

  beforeEach(() => {
    req = {
      userId: 'user123',
      body: {
        _id: 'cart123',
        quantity: 2
      }
    }

    res = {
      json: jest.fn()
    }
  })

  // ❌ missing id
  test('should return error if id missing', async () => {
    req.body._id = null

    await updateAddToCartProduct(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

  // ❌ invalid quantity
  test('should return error if quantity invalid', async () => {
    req.body.quantity = 0

    await updateAddToCartProduct(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

  // ❌ product not found
  test('should return error if product not found', async () => {
    addToCartModel.updateOne.mockResolvedValue({ matchedCount: 0 })

    await updateAddToCartProduct(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

  // ✅ success
  test('should update product successfully', async () => {
    addToCartModel.updateOne.mockResolvedValue({ matchedCount: 1 })

    await updateAddToCartProduct(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: "Product Updated"
      })
    )
  })

})