// models/patient.js
module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define('Patient', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
          validate: {
            notEmpty: {
              msg: "Name is required"
            }
          }
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Date of birth is required"
          },
          isDate: {
            msg: "Invalid date format"
          }
        }
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Gender is required"
          },
          isIn: {
            args: [['male', 'female', 'other']],
            msg: "Gender must be male, female, or other"
          }
        }
      }
    });
  
    return Patient;
  };