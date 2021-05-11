'use strict';
const {
  Model
} = require('sequelize');
const { getCurrentDate } = require('../helpers');
module.exports = (sequelize, DataTypes) => {
  class Sold_Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sold_Product.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
        targetKey: 'employee_id'
      })
      Sold_Product.belongsTo(models.Product, {
        foreignKey: 'product_id',
        targetKey: 'product_id'
      })
    }
  };
  Sold_Product.init({
    sold_product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `ID Employee can't be null !`
        },
        notEmpty: {
          msg: `ID Employee can't be empty !`
        }
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `ID Product can't be null !`
        },
        notEmpty: {
          msg: `ID Product can't be empty !`
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Quantity can't be null !`
        },
        notEmpty: {
          msg: `Quantity can't be empty !`
        }
      }
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Total price can't be null !`
        },
        notEmpty: {
          msg: `Total price can't be empty !`
        }
      }
    },
    status: DataTypes.ENUM('0', '1', '2'),
    create_by: DataTypes.STRING,
    create_date: DataTypes.DATE,
    update_by: DataTypes.STRING,
    update_date: DataTypes.DATE
  }, {
    hooks: {
      beforeCreate (instance) {
        if (!instance.status) instance.status = '1'
        instance.create_date = getCurrentDate()
      }
    },
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: 'Sold_Product',
  });
  Sold_Product.removeAttribute('id')
  return Sold_Product;
};