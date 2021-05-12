const { getCurrentDate, convertRupiah } = require('../../helpers')
const { Sold_Product, Product, sequelize } = require('../../models')

module.exports = async (req, res, next) => {
  const t = await sequelize.transaction()
  try {
    const { product_id } = req.params
    const { quantity } = req.body
    if (!quantity || !Number(quantity)) {
      throw {
        status: 400,
        message: `Quantity can't be empty or 0 !`
      }
    } else {
      const findProduct = await Product.findOne({
        where: {
          product_id: +product_id,
          status: '1'
        },
        attributes: ['name', 'stock', 'total_price']
      })
      if (findProduct) {
        if (+quantity > findProduct.stock) {
          throw {
            status: 400,
            message: `Sorry, insufficient stock !`
          }
        } else {
          const payloadSales = {
            employee_id: req.loginEmployee.employee_id,
            product_id: +product_id,
            quantity,
            create_by: req.loginEmployee.employee_id,
            total_price: Number(quantity) * findProduct.total_price
          }
          const payloadProduct = {
            stock: findProduct.stock - Number(quantity),
            status: '1',
            update_by: req.loginEmployee.employee_id,
            update_date: getCurrentDate()
          }
          const arrPromises = [
            Sold_Product.create(payloadSales, {
              transaction: t
            }),
            Product.update(payloadProduct, {
              where: {
                product_id: +product_id
              },
              transaction: t
            })
          ]
          const createSalesHistoryAndUpdateProduct = await Promise.all(arrPromises)
          if (createSalesHistoryAndUpdateProduct) {
            const salesHistory = createSalesHistoryAndUpdateProduct[0]
            const updateProduct = createSalesHistoryAndUpdateProduct[1][0]
            if (!updateProduct) {
              throw { 
                name: 'Update Product Failed'
              }
            } else {
              await t.commit()
              res.status(200).json({
                message: `Successfully to create sales history !`,
                data: {
                  product_name: findProduct.name,
                  quantity: +quantity,
                  total_price: convertRupiah(quantity * findProduct.total_price),
                  remaining_stock: findProduct.stock - quantity
                }
              })
            }
          } else throw {
            status: 400,
            message: `Failed to create sales history !`
          }
        }
      } else throw {
        status: 400,
        message: `Data Product Not Found !`
      }
    }
  } catch (err) {
    if (err.name === 'Update Product Failed') {
      await t.rollback()
      next({
        status: 400,
        message: `Failed to create sales history !`
      })
    } else next(err)
  }
}