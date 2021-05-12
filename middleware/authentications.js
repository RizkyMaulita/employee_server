const { verifyToken } = require('../helpers')
const { Employee } = require('../models')

const employeeAuthentications = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      throw {
        status: 401,
        message: `Please login first !`
      }
    } else {
      const decoded = await verifyToken(authorization)
      if (decoded) {
        const findEmployee = await Employee.findOne({
          where: {
            employee_id: decoded.employee_id,
            email: decoded.email,
          },
          attributes: ['employee_id']
        })
        if (findEmployee) {
          req.loginEmployee = decoded
          next()
        } else throw {
          status: 401,
          message: `Please login first !`
        }
      } else throw {
        status: 401,
        message: `Please login first !`
      }
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  employeeAuthentications
}