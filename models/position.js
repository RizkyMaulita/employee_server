'use strict';
const {
  Model
} = require('sequelize');
const { getCurrentDate } = require('../helpers');
module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Position.hasMany(models.Employee, {
        sourceKey: 'position_id',
        foreignKey: 'position_id'
      })
    }
  };
  Position.init({
    position_id: {
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
          msg: `Position's name can't be null !`
        },
        notEmpty: {
          msg: `Position's name can't be empty !`
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
        if (!instance.create_by) instance.create_by = 'admin'
      }
    },
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: 'Position',
  });
  Position.removeAttribute('id')
  return Position;
};