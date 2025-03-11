// controllers/mappingController.js
const { Patient, Doctor, PatientDoctor } = require('../models');

exports.assignDoctorToPatient = async (req, res) => {
  try {
      const { patientId, doctorId } = req.body;
      const patient = await Patient.findByPk(patientId);
      const doctor = await Doctor.findByPk(doctorId);

      if (!patient || !doctor) {
          return res.status(404).json({ message: 'Patient or Doctor not found' });
      }

      // Check for existing mapping
      const existingMapping = await PatientDoctor.findOne({
          where: {
              patientId: patientId,
              doctorId: doctorId
          }
      });

      if (existingMapping) {
          return res.status(409).json({ message: 'Doctor is already assigned to this patient' }); // 409 Conflict
      }

      await PatientDoctor.create({ patientId, doctorId });
      res.status(201).json({ message: 'Doctor assigned to patient successfully' });
  } catch (error) {
      console.error(error);
      // Handle SequelizeUniqueConstraintError specifically
      if (error.name === 'SequelizeUniqueConstraintError') {
          return res.status(409).json({ message: 'Doctor is already assigned to this patient', details: error.errors });
      }
      res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getAllMappings = async (_req, res) => {
    try {
        // The error is happening here - incorrect association references
        // We need to correctly reference the associations from the models
        const mappings = await PatientDoctor.findAll({
            include: [
                {
                    model: Patient,
                    // Remove the 'as' alias or make sure it matches model definition
                    attributes: ['id', 'name'],
                },
                {
                    model: Doctor,
                    // Remove the 'as' alias or make sure it matches model definition
                    attributes: ['id', 'name'],
                },
            ],
        });
        res.json(mappings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.getDoctorsByPatientId = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.patientId, {
            include: [{ model: Doctor, as: 'doctors', through: { attributes: [] } }],
        });

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.json(patient.doctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.removeDoctorFromPatient = async (req, res) => {
    try {
        const mapping = await PatientDoctor.findByPk(req.params.id);
        if (!mapping) {
            return res.status(404).json({ message: 'Mapping not found' });
        }
        await mapping.destroy();
        res.json({ message: 'Doctor removed from patient' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};