const fieldValidationMW = require("../../../base/middlewares/filedValidationMiddlewares");

const { requiredFieldValidationMW } = fieldValidationMW;

exports.profile = [
  requiredFieldValidationMW("status"),
  requiredFieldValidationMW("skills"),
];

exports.profileExperience = [
  requiredFieldValidationMW("title"),
  requiredFieldValidationMW("company"),
  requiredFieldValidationMW("location"),
  requiredFieldValidationMW("from"),
  requiredFieldValidationMW("to"),
  requiredFieldValidationMW("current"),
  requiredFieldValidationMW("description"),
];

exports.profileEducation = [
  requiredFieldValidationMW("institute"),
  requiredFieldValidationMW("degree"),
  requiredFieldValidationMW("fieldofstudy"),
  requiredFieldValidationMW("from"),
  requiredFieldValidationMW("to"),
  requiredFieldValidationMW("current"),
  requiredFieldValidationMW("description"),
];
