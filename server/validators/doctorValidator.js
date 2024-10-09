const { body, validationResult } = require('express-validator');

const validateDoctor = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('specialty_id').isInt().withMessage('Specialty ID is not valid'),
    body('gender').isIn(['male', 'female', 'other']).withMessage('Gender is not valid'),
    body('date_of_birth').isISO8601().withMessage('Date of Birth is not valid'),
    body('license').notEmpty().withMessage('License is required'),
    body('status').isIn(['Approved', 'Declined']).withMessage('Status is not valid'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateDoctor;