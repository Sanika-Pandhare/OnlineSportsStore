const UploadProductController = require('../controller/product/uploadProduct')
const productModel = require('../models/productModel')
const uploadProductPermission = require('../helpers/permission')

// ✅ mocks
jest.mock('../models/productModel')
jest.mock('../helpers/permission')

describe('UploadProductController', () => {

  let req, res

  beforeEach(() => {
    req = {
      userId: 'user123',
      body: {
        productName: "Shoes",
        brandName: "Nike",
        category: "Sports",
        productImage: ["img1.jpg"],
        description: "Good shoes",
        price: 100,
        sellingPrice: 80
      }
    }

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
  })

  // ✅ 1. SUCCESS
  test('should upload product successfully', async () => {
    uploadProductPermission.mockReturnValue(true)

    const mockSave = jest.fn().mockResolvedValue({ productName: "Shoes" })

    productModel.mockImplementation(() => ({
      save: mockSave
    }))

    await UploadProductController(req, res)

    expect(res.status).toHaveBeenCalledWith(201)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: "Product uploaded successfully"
      })
    )
  })

  // ❌ 2. PERMISSION DENIED
  test('should return error if permission denied', async () => {
    uploadProductPermission.mockReturnValue(false)

    await UploadProductController(req, res)

    expect(res.status).toHaveBeenCalledWith(400)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

  // ❌ 3. MISSING REQUIRED FIELDS
  test('should return error if required fields missing', async () => {
    uploadProductPermission.mockReturnValue(true)
    req.body.productName = ""

    await UploadProductController(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

  // ❌ 4. INVALID IMAGE ARRAY
  test('should return error if image array is empty', async () => {
    uploadProductPermission.mockReturnValue(true)
    req.body.productImage = []

    await UploadProductController(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

  // ❌ 5. INVALID IMAGE DATA
  test('should return error if image data is invalid', async () => {
    uploadProductPermission.mockReturnValue(true)
    req.body.productImage = [null, 123]

    await UploadProductController(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

  // ❌ 6. DB ERROR
  test('should handle database error', async () => {
    uploadProductPermission.mockReturnValue(true)

    const mockSave = jest.fn().mockRejectedValue(new Error("DB error"))

    productModel.mockImplementation(() => ({
      save: mockSave
    }))

    await UploadProductController(req, res)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    )
  })

})