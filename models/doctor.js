// models/doctor.js
module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required"
          }
        }
      },
      specialty: {
        type: DataTypes.STRING,
        allowNull: false,
         validate: {
            notEmpty: {
              msg: "Specialty is required"
            }
         }
      }
    });
  
    return Doctor;
  };