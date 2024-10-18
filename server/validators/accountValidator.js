const { body, validationResult } = require('express-validator');

const validateAccount = [
    body('hospital_id').notEmpty().isNumeric().withMessage('Hospital ID must be a number'),
    body('patient_id').notEmpty().isNumeric().withMessage('Patient ID must be a number'),
    body('price').notEmpty().isDecimal().isNumeric().withMessage('Price must be a number'),
    body('date').notEmpty().isDate().withMessage('Date must be a date'),
    body('description').notEmpty().isString().withMessage('Description must be a string'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateAccount;
