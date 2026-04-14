const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const productModel = require('../models/productModel')

jest.mock('../models/productModel')

describe('getCategoryWiseProduct', () => {

  let req, res

  beforeEach(() => {
    req = {
      body: { category: 'sports' }
    }

    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    }
  })

  // ✅ success
  test('should return products by category', async () => {
    productModel.find.mockResolvedValue([{ category: 'sports' }])

    await getCategoryWiseProduct(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: [{ category: 'sports' }]
      })
    )
  })

  // ❌ category missing
  test('should return error if category missing', async () => {
    req.body = {}

    await getCategoryWiseProduct(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
  })

  // ✅ no products
  test('should return empty array if no products found', async () => {
    productModel.find.mockResolvedValue([])

    await getCategoryWiseProduct(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: []
      })
    )
  })

  // ❌ DB error
  test('should handle database error', async () => {
    productModel.find.mockRejectedValue(new Error("DB error"))

    await getCategoryWiseProduct(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
  })

})