const { body, validationResult } = require('express-validator');

const validatePatient = [
    body('name').notEmpty().withMessage('Name is required'),
    body('last_name').notEmpty().withMessage('Last Name is required'),
    body('gender').isIn(['male', 'female', 'other']).withMessage('Gender is not valid'),
    body('date_of_birth').isISO8601().withMessage('Date of Birth is not valid'),
    body('age').isInt().withMessage('Age is not valid'),
    body('status').isIn(['Approved', 'Declined']).withMessage('Status is not valid'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validatePatient;