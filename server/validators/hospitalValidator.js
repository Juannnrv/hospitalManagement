const { body, validationResult } = require('express-validator');

const validateHospital = [
    body("name").isString().notEmpty().withMessage('Name is required'),
    body("address").isString().notEmpty().withMessage('Address is required'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateHospital;