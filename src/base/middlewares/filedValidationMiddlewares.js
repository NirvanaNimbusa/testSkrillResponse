const { check, validationResult } = require("express-validator");

exports.requiredFieldValidationMW = (fieldName) =>
  check(fieldName)
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(`The ${fieldName} is required`);

// exports.nonEmptyFieldValidationMW = (fieldName) =>
//   check(fieldName).notEmpty().withMessage(`The ${fieldName} is Required`);

// exports.minLengthValidationMW = (minCharacters, fieldName) =>
//   check(fieldName)
//     .isLength({ min: minCharacters })
//     .withMessage(
//       `The ${fieldName} required length should be ${minCharacters} or more`
//     );

// exports.maxLengthValidationMW = (maxCharacters, fieldName) =>
//   check(fieldName)
//     .isLength({ max: maxCharacters })
//     .withMessage(`The ${fieldName} has more than ${maxCharacters} characters`);

exports.emailFieldValidationMW = (fieldName, optional = true) =>
  check(fieldName)
    .optional({ checkFalsy: optional })
    .isEmail()
    .withMessage("The email address is not valid!");

exports.passwordFieldValidationMW = (fieldName, minLength) =>
  check(fieldName)
    .isLength({ min: minLength })
    .withMessage(
      `Invalid password length, The length should be at least ${minLength} or more`
    );

// exports.uuidValidationMW = (fieldName, msg) =>
//   check(fieldName)
//     .isUUID("4")
//     .withMessage(msg || `Invalid ${fieldName} id`);

exports.validationResultMW = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  } else next();
};

// exports.compareFieldValidation = (fromField, toField) =>
//   check(fromField, `The ${fromField} does not match with ${toField}`)
//     .exists()
//     .custom((value, { req }) => value === req.body[toField]);
