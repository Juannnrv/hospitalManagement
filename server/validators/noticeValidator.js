const { body, validationResult } = require("express-validator");

const validateNotice = [
    body("hospital_id").notEmpty().isInt().withMessage("Hospital ID is required"),
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("description").isString().notEmpty().withMessage("Description is required"),
    body("date").notEmpty().isISO8601().withMessage("Date is not valid"),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = validateNotice;
