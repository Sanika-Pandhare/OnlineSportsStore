const userLogoutController = require('../controller/user/userLogout')

describe('userLogoutController', () => {

  let req, res

  beforeEach(() => {
    req = {}

    res = {
      clearCookie: jest.fn(),
      json: jest.fn()
    }
  })

  test('should clear cookie and logout user', async () => {
    await userLogoutController(req, res)

    expect(res.clearCookie).toHaveBeenCalledWith('token')

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true
      })
    )
  })

})