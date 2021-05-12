const { Employee } = require('../../models')
const { verifyPassword, generateToken } = require('../../helpers')

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      throw {
        status: 400,
        message: `'email' and 'password' can't be empty !`
      }
    } else {
      const findDataEmployee = await Employee.findOne({
        where: { email },
        attributes: ['employee_id', 'name', 'email', 'password', 'position_id']
      })
      if (findDataEmployee) {
        const verifyPass = await verifyPassword(password, findDataEmployee.password)
        if (verifyPass) {
          const { employee_id, name, position_id } = findDataEmployee
          const payloadToken = {
            employee_id,
            name,
            email,
            position_id
          }
          const createToken = await generateToken(payloadToken)
          if (createToken) {
            res.status(200).json({
              message: `Successfully to login !`,
              access_token: createToken
            })
          }
        } else throw {
          status: 401,
          message: `Invalid email / password !`
        }
      } else throw {
        status: 401,
        message: `Please, register first !`
      }
    }
  } catch (err) {
    next(err)
  }
}