'use strict';
const {
  Model
} = require('sequelize');
const { getCurrentDate } = require('../helpers');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Sold_Product, {
        foreignKey: 'product_id',
        sourceKey: 'product_id'
      })
    }
  };
  Product.init({
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Product's name can't be null !`
        },
        notEmpty: {
          msg: `Product's name can't be empty !`
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Product's name can't be null !`
        },
        notEmpty: {
          msg: `Product's name can't be empty !`
        },
        min: {
          args: [0],
          msg: `Product's stock sold out !`
        }
      }
    },
    initial_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Initial price of product can't be null !`
        },
        notEmpty: {
          msg: `Initial price of product can't be empty !`
        }
      }
    },
    discount: DataTypes.INTEGER,
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Total price of product can't be null !`
        },
        notEmpty: {
          msg: `Total price of product can't be empty !`
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
    modelName: 'Product',
  });
  Product.removeAttribute('id')
  return Product;
};