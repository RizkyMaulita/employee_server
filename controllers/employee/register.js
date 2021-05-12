const { Employee, Position } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const { name, email, password, position_name } = req.body
    if (!name || !email || !password || !position_name) {
      throw {
        status: 400,
        message: `'name', 'email', 'password', and 'position_name' can't be empty !`
      }
    } else {
      let position_id = 0
      const findPosition = await Position.findOne({
        where: {
          name: position_name
        },
        attributes: ['position_id']
      })
      if (findPosition) {
        position_id = findPosition.position_id
      } else {
        const createPosition = await Position.create({
          name: position_name,
          create_by: name
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
          password,
          position_id,
          create_by: name
        }
        const createEmployee = await Employee.create(payloadEmployee)
        if (createEmployee) {
          res.status(201).json({
            message: `Successfully to register !`,
            data: {
              employee_id: createEmployee.employee_id,
              name,
              email,
              position_name
            }
          })
        } else throw {
          status: 400,
          message: `Failed to create new employee !`
        }        
      }
    }
  } catch (err) {
    next(err)
  }
}