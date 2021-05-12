const { convertRupiah } = require('../../helpers')
const { Sold_Product, Product } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const findData = await Sold_Product.findAll({
      where: {
        status: '1',
        employee_id: req.loginEmployee.employee_id
      },
      attributes: {
        exclude: [ 'employee_id', 'status', 'create_by', 'create_date', 'update_by', 'update_date']
      },
      include: {
        model: Product,
        attributes: ['name']
      }
    })
    if (findData && findData.length) {
      const result = findData.map(data => {
        const { sold_product_id, product_id, quantity, total_price, Product : product } = data
        let temp = {
          sold_product_id,
          product_id,
          quantity,
          total_price: convertRupiah(total_price),
          product_name: product && product.name ? product.name : ''
        }
        return temp
      })
      res.status(200).json(result)
    } else throw {
      status: 404,
      message: `You never sold at least one product !`
    }
  } catch (err) {
    next(err)
  }
}