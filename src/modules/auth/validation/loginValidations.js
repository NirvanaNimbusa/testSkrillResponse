const fieldValidationMW = require("../../../../src/base/middlewares/filedValidationMiddlewares");

const { emailFieldValidationMW, requiredFieldValidationMW } = fieldValidationMW;

const loginValidations = [
  emailFieldValidationMW("email"),
  requiredFieldValidationMW("email"),
  requiredFieldValidationMW("password"),
];

module.exports = loginValidations;
