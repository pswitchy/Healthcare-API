// models/patientDoctor.js
module.exports = (sequelize, DataTypes) => {
  const PatientDoctor = sequelize.define('PatientDoctor', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
  });
  
  // Add association methods
  PatientDoctor.associate = function(models) {
    // PatientDoctor belongs to Patient
    PatientDoctor.belongsTo(models.Patient, {
      foreignKey: 'patientId'
    });
    
    // PatientDoctor belongs to Doctor
    PatientDoctor.belongsTo(models.Doctor, {
      foreignKey: 'doctorId'
    });
  };

  return PatientDoctor;
};