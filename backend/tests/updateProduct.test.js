const updateProductController = require('../controller/product/updateProduct')
const productModel = require('../models/productModel')
const uploadProductPermission = require('../helpers/permission')

jest.mock('../models/productModel')
jest.mock('../helpers/permission')

describe('updateProductController', () => {

  let req, res

  beforeEach(() => {
    req = {
      userId: 'admin123',
      body: {
        _id: 'p1',
        productName: 'New Name'
      }
    }

    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    }
  })

  // ✅ success
  test('should update product successfully', async () => {
    uploadProductPermission.mockReturnValue(true)
    productModel.findByIdAndUpdate.mockResolvedValue({ _id: 'p1' })

    await updateProductController(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true })
    )
  })

  // ❌ permission denied
  test('should return error if permission denied', async () => {
    uploadProductPermission.mockReturnValue(false)

    await updateProductController(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
  })

  // ❌ missing id
  test('should return error if id missing', async () => {
    uploadProductPermission.mockReturnValue(true)
    req.body._id = null

    await updateProductController(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
  })

  // ❌ product not found
  test('should return error if product not found', async () => {
    uploadProductPermission.mockReturnValue(true)
    productModel.findByIdAndUpdate.mockResolvedValue(null)

    await updateProductController(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
  })

})