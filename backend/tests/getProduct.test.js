const getProductController = require('../controller/product/getProduct')
const productModel = require('../models/productModel')

jest.mock('../models/productModel')

describe('getProductController', () => {

  let req, res

  beforeEach(() => {
    req = {}

    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    }
  })

  // ✅ 1. SUCCESS
  test('should return all products', async () => {
    const mockData = [{ name: 'Product1' }]

    productModel.find.mockReturnValue({
      sort: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue(mockData)
      })
    })

    await getProductController(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: mockData
      })
    )
  })

  // ✅ 2. EMPTY DATA
  test('should return empty array if no products', async () => {
    productModel.find.mockReturnValue({
      sort: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue([])
      })
    })

    await getProductController(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: []
      })
    )
  })

  // ❌ 3. DB ERROR
  test('should handle database error', async () => {
    productModel.find.mockReturnValue({
      sort: jest.fn().mockReturnValue({
        limit: jest.fn().mockImplementation(() => {
          return Promise.reject(new Error("DB error"))
        })
      })
    })

    await getProductController(req, res)

    expect(res.status).toHaveBeenCalledWith(400)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

})