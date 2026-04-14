const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const addToCartModel = require('../models/cartProduct')

jest.mock('../models/cartProduct')

describe('deleteAddToCartProduct', () => {

  let req, res

  beforeEach(() => {
    req = {
      userId: 'user123',
      body: { _id: 'cart123' }
    }

    res = {
      json: jest.fn()
    }
  })

  // ❌ missing id
  test('should return error if id missing', async () => {
    req.body._id = null

    await deleteAddToCartProduct(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    )
  })

  // ❌ not found
  test('should return error if product not found', async () => {
    addToCartModel.deleteOne.mockResolvedValue({ deletedCount: 0 })

    await deleteAddToCartProduct(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    )
  })

  // ✅ success
  test('should delete product successfully', async () => {
    addToCartModel.deleteOne.mockResolvedValue({ deletedCount: 1 })

    await deleteAddToCartProduct(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: "Product Deleted From Cart"
      })
    )
  })

})