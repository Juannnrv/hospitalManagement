const { body, validationResult } = require('express-validator');

const validateAccount = [
    body('hospital_id').isNumeric().withMessage('Hospital ID must be a number'),
    body('patient_id').isNumeric().withMessage('Patient ID must be a number'),
    body('price').isDecimal().isNumeric().withMessage('Price must be a number'),
    body('date').isDate().withMessage('Date must be a date'),
    body('description').isString().withMessage('Description must be a string'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateAccount;
