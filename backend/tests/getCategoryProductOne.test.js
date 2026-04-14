const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const productModel = require('../models/productModel')

jest.mock('../models/productModel')

describe('getCategoryProduct', () => {

  let req, res

  beforeEach(() => {
    req = {}
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    }
  })

  // ✅ success
  test('should return products by category', async () => {
    productModel.distinct.mockResolvedValue(['Sports', 'Electronics'])

    productModel.findOne
      .mockResolvedValueOnce({ category: 'Sports' })
      .mockResolvedValueOnce({ category: 'Electronics' })

    await getCategoryProduct(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: [
          { category: 'Sports' },
          { category: 'Electronics' }
        ]
      })
    )
  })

  // ✅ empty categories
  test('should return empty array if no categories', async () => {
    productModel.distinct.mockResolvedValue([])

    await getCategoryProduct(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: []
      })
    )
  })

  // ❌ DB error
  test('should handle database error', async () => {
    productModel.distinct.mockRejectedValue(new Error("DB error"))

    await getCategoryProduct(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
  })

})