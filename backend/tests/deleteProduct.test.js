const deleteProductController = require('../controller/product/deleteProduct')
const productModel = require('../models/productModel')
const uploadProductPermission = require('../helpers/permission')

jest.mock('../models/productModel')
jest.mock('../helpers/permission')

describe('deleteProductController', () => {

  let req, res

  beforeEach(() => {
    req = {
      userId: 'admin123',
      body: {
        productId: 'p1'
      }
    }

    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    }
  })

  // ✅ success
  test('should delete product successfully', async () => {
    uploadProductPermission.mockReturnValue(true)
    productModel.findByIdAndDelete.mockResolvedValue({ _id: 'p1' })

    await deleteProductController(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: "Product deleted successfully"
      })
    )
  })

  // ❌ permission denied
  test('should return error if permission denied', async () => {
    uploadProductPermission.mockReturnValue(false)

    await deleteProductController(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
  })

  // ❌ missing productId
  test('should return error if productId missing', async () => {
    uploadProductPermission.mockReturnValue(true)
    req.body.productId = null

    await deleteProductController(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
  })

  // ❌ product not found
  test('should return error if product not found', async () => {
    uploadProductPermission.mockReturnValue(true)
    productModel.findByIdAndDelete.mockResolvedValue(null)

    await deleteProductController(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
  })

  // ❌ DB error
  test('should handle database error', async () => {
    uploadProductPermission.mockReturnValue(true)
    productModel.findByIdAndDelete.mockRejectedValue(new Error("DB error"))

    await deleteProductController(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
  })

})