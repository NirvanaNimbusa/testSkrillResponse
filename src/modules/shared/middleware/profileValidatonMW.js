const profileFieldValidation = require("../validation/profileFieldValidation");
const validatonFieldMW = require("../../../base/middlewares/filedValidationMiddlewares");
const profileFieldValtions = require("../validation/profileFieldValidation");

const { validationResultMW } = validatonFieldMW;

const middlewares = {
  profile: [profileFieldValtions.profile, validationResultMW],
  experience: [profileFieldValtions.profileExperience, validationResultMW],
  education: [profileFieldValtions.profileEducation, validationResultMW],
};

module.exports = middlewares;
