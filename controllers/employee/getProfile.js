const { Employee, Position } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const arrPromises = [
      Employee.findOne({
        where: {
          employee_id: req.loginEmployee.employee_id
        },
        attributes: {
          exclude: ['password', 'status', 'create_date', 'create_by', 'update_date', 'update_by']
        },
        include: {
          model: Position,
          attributes: ['name']
        }
      }),
      Position.findAll({
        where: {
          status: '1'
        },
        attributes: ['name']
      })
    ]
    const findData = await Promise.all(arrPromises)
    if (findData) {
      const dataEmployee = findData[0]
      const dataPosition = findData[1]
      if (dataEmployee) {
        const { employee_id, name, email, position_id, salary, start_date, end_date, Position } = dataEmployee
        const data_position = []
        dataPosition.forEach(position => {
          if (position.name) {
            data_position.push(position.name)
          }
        })
        res.status(200).json({
          data_employee: {
            employee_id,
            name,
            email,
            salary,
            start_date,
            end_date,
            position_id,
            position_name: Position && Position.name ? Position.name : ''
          },
          data_position
        })
      } else throw {
        status: 404,
        message: `Data Employee Not Found !`
      }
    }
  } catch (err) {
    next(err)
  }
}