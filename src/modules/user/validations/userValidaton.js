const fieldValidationMW = require("../../../../src/base/middlewares/filedValidationMiddlewares");

const {
  emailFieldValidationMW,
  passwordFieldValidationMW,
  requiredFieldValidationMW,
} = fieldValidationMW;

const userValidations = [
  requiredFieldValidationMW("name"),
  emailFieldValidationMW("email"),
  requiredFieldValidationMW("email"),
  requiredFieldValidationMW("password"),
  passwordFieldValidationMW("password", 6),
];

module.exports = userValidations;
