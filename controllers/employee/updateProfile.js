const { Employee, Position } = require('../../models')
const { generateToken } = require('../../helpers')

module.exports = async (req, res, next) => {
  try {
    const { name, email, salary, start_date, end_date, position_name } = req.body
    let position_id = 0
    const checkPosition = await Position.findOne({
      where: {
        name: position_name
      },
      attributes: ['position_id']
    })
    if (checkPosition) {
      position_id = checkPosition.position_id
    } else {
      const createPosition = await Position.create({
        name: position_name
      })
      if (createPosition) {
        position_id = createPosition.position_id
      } else throw {
        status: 400,
        message: `Failed to create new position !`
      }
    }
    if (position_id) {
      const payloadEmployee = {
        name,
        email,
        salary,
        start_date: start_date ? start_date : null,
        end_date: end_date ? end_date : null,
        position_id
      }
      const updateDataEmployee = await Employee.update( payloadEmployee, {
        where: {
          employee_id: req.loginEmployee.employee_id
        },
        returning: true
      })
      if (updateDataEmployee && updateDataEmployee[0]) {
        const {employee_id, name, email, position_id} = updateDataEmployee[1][0]
        const payloadToken = {
          employee_id,
          name,
          email,
          position_id
        }
        const createNewToken = await generateToken(payloadToken) 
        if (createNewToken) {
          res.status(200).json({
            message: `Successfully to update data employee !`,
            new_access_token: createNewToken,
            data: {
              employee_id,
              name,
              email,
              position_id
            }
          })
        }
      } else throw {
        status: 400,
        message: `Failed to update data employee !`
      }
    }
  } catch (err) {
    next(err)
  }
}