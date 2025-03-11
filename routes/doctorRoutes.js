// routes/doctorRoutes.js
const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateDoctor } = require('../utils/validation');

router.post('/', authMiddleware, validateDoctor, doctorController.addDoctor);
router.get('/', authMiddleware, doctorController.getAllDoctors);
router.get('/:id', authMiddleware, doctorController.getDoctorById);
router.put('/:id', authMiddleware, validateDoctor, doctorController.updateDoctor);
router.delete('/:id', authMiddleware, doctorController.deleteDoctor);

module.exports = router;