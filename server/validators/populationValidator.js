const { body, validationResult } = require('express-validator');

const validatePopulation = [
    body('patient_id').notEmpty().isInt().withMessage('Patient ID must be an integer'),
    body('doctor_id').notEmpty().isInt().withMessage('Doctor ID must be an integer'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

module.exports = validatePopulation;