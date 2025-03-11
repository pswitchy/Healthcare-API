const express = require('express');
const router = express.Router();
const mappingController = require('../controllers/mappingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, mappingController.assignDoctorToPatient);
router.get('/', authMiddleware, mappingController.getAllMappings);
router.get('/:patientId', authMiddleware, mappingController.getDoctorsByPatientId);
router.delete('/:id', authMiddleware, mappingController.removeDoctorFromPatient);

module.exports = router;