'use strict';
const {
  Model
} = require('sequelize');
const { getCurrentDate, generatePassword } = require('../helpers');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.belongsTo(models.Position, {
        foreignKey: 'position_id',
        targetKey: 'position_id'
      })
      Employee.hasMany(models.Sold_Product, {
        foreignKey: 'employee_id',
        sourceKey: 'employee_id'
      })
    }
  };
  Employee.init({
    employee_id: {
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
          msg: `Employee's name can't be null !`
        },
        notEmpty: {
          msg: `Employee's name can't be empty !`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: `Employee's email can't be null !`
        },
        notEmpty: {
          msg: `Employee's email can't be empty !`
        },
        isEmail: {
          msg: `Wrong email format !`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Employee's password can't be null !`
        },
        notEmpty: {
          msg: `Employee's password can't be empty !`
        },
        len: {
          args: [7],
          msg: `Password must be contain minimum 7 characters !`
        }
      }
    },
    position_id: DataTypes.INTEGER,
    salary: DataTypes.INTEGER,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    status: DataTypes.ENUM('0', '1', '2'),
    create_by: DataTypes.STRING,
    create_date: DataTypes.DATE,
    update_by: DataTypes.STRING,
    update_date: DataTypes.DATE
  }, {
    hooks: {
      beforeCreate (instance) {
        instance.password = generatePassword(instance.password)
        if (!instance.status) instance.status = '1'
        instance.create_date = getCurrentDate()
      }
    },
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: 'Employee',
  });
  Employee.removeAttribute('id')
  return Employee;
};