// models/index.js
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Patient = require('./patient')(sequelize, Sequelize);
db.Doctor = require('./doctor')(sequelize, Sequelize);
db.PatientDoctor = require('./patientDoctor')(sequelize, Sequelize);

// Associations
db.User.hasMany(db.Patient, { foreignKey: 'userId', as: 'patients' });
db.Patient.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

db.Patient.belongsToMany(db.Doctor, { through: db.PatientDoctor, foreignKey: 'patientId', as: 'doctors' });
db.Doctor.belongsToMany(db.Patient, { through: db.PatientDoctor, foreignKey: 'doctorId', as: 'patients' });

// Add the additional direct associations for PatientDoctor
db.PatientDoctor.belongsTo(db.Patient, { foreignKey: 'patientId' });
db.PatientDoctor.belongsTo(db.Doctor, { foreignKey: 'doctorId' });

// Call associate if it exists
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;