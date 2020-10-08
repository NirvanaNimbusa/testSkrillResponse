const userValidation = require("../validations/userValidaton");
const validationMW = require("../../../base/middlewares/filedValidationMiddlewares");

const { validationResultMW } = validationMW;

const middlewares = {
  user: [userValidation, validationResultMW],
};

module.exports = middlewares;
