const loginValidation = require("../validation/loginValidations");
const validationMW = require("../../../base/middlewares/filedValidationMiddlewares");

const { validationResultMW } = validationMW;

const middlewares = {
  login: [loginValidation, validationResultMW],
};

module.exports = middlewares;
