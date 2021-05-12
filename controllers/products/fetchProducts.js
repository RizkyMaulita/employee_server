const { Product } = require('../../models')
const { convertRupiah } = require('../../helpers')

module.exports = async (req, res, next) => {
  try {
    const findDataProducts = await Product.findAll({
      where: {
        status: '1'
      },
      attributes: {
        exclude: ['create_by', 'create_date', 'update_by', 'update_date', 'status']
      }
    })
    if (findDataProducts && findDataProducts.length) {
      const result = findDataProducts.map(product => {
        const { product_id, name, stock, initial_price, discount, total_price } = product
        let temp = {
          product_id,
          name,
          stock,
          initial_price: convertRupiah(initial_price),
          discount,
          total_price: convertRupiah(total_price)
        }
        return temp
      })
      res.status(200).json(result) 
    } else throw {
      status: 404,
      message: `Data Products Not Found !`
    }
  } catch (err) {
    next(err)
  }
}