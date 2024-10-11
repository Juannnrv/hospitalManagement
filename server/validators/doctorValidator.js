const { body, validationResult } = require('express-validator');

const validateDoctor = [
    body('name').isString().withMessage('Name must be a string'),
    body('email').isEmail().withMessage('Email must be a valid email'),
    body('phone').isString().withMessage('Phone must be a string'),
    body('specialty_id').isInt().withMessage('Specialty ID must be an integer'),
    body('gender').isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other'),
    body('date_of_birth').isISO8601().withMessage('Date of Birth must be a valid date'),
    body('license').isString().withMessage('License must be a string'),
    body('status').isIn(['Approved', 'Declined']).withMessage('Status must be Approved or Declined'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateDoctor;