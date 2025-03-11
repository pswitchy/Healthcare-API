// utils/validation.js
const { body } = require('express-validator');

exports.validateRegistration = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

exports.validateLogin = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
];

exports.validatePatient = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('dob').isDate().withMessage('Invalid date format'),
    body('gender').isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other')
];

exports.validateDoctor = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('specialty').trim().notEmpty().withMessage('Specialty is required')
];