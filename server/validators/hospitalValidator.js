const { body, validationResult } = require('express-validator');

const validateHospital = [
    body("name").isString().notEmpty().withMessage('Name is required'),
    body("address").isString().notEmpty().withMessage('Address is required'),
    body('email').notEmpty().isEmail().withMessage('Email must be a valid email'),
    body('phone').notEmpty().isString().withMessage('Phone must be a string'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateHospital;