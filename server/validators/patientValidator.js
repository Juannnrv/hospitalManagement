const { body, validationResult } = require('express-validator');

const validatePatient = [
    body('name').notEmpty().isString().withMessage('Name must be a string'),
    body('email').notEmpty().isEmail().withMessage('Email must be a valid email'),
    body('phone').notEmpty().isString().withMessage('Phone must be a string'),
    body('gender').notEmpty().isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other'),
    body('date_of_birth').notEmpty().isISO8601().withMessage('Date of Birth must be a valid date'),
    body('age').notEmpty().isInt().withMessage('Age must be an integer'),
    body('status').notEmpty().isIn(['Approved', 'Declined']).withMessage('Status must be Approved or Declined'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validatePatient;