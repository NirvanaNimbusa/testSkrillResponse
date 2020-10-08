const express = require("express");
const userCtr = require("./modules/user/controller/userCtr");
const authCtr = require("./modules/auth/controller/authCtr");
const loginCtr = require("./modules/auth/controller/loginCtr");
const postCtr = require("./modules/shared/controller/postCtr");
const profileCtr = require("./modules/shared/controller/profileCtr");
const userValidationMW = require("../src/modules/user/middleware/validationMW");
const loginValidationMW = require("./modules/auth/middleware/validationMW");
const profileFieldValidationMW = require("./modules/shared/middleware/profileValidatonMW");
const authMW = require("../src/modules/auth//middleware/authMW");

const router = express.Router();

router.post("/register-users", ...userValidationMW.user, userCtr.addUser);
router.get("/auth", authMW.auth, authCtr.auth);
router.delete("/user", authMW.auth, userCtr.deleteUser);
router.post("/login", ...loginValidationMW.login, loginCtr.login);
router.get("/posts", authMW.auth, postCtr.posts);
router.get("/profile", authMW.auth, profileCtr.getCurrentProfile);
router.get("/profile/github/:username", authMW.auth, profileCtr.getGithubRepos);
router.get("/profile/:user_id", authMW.auth, profileCtr.getProfileById);
router.get("/profiles", authMW.auth, profileCtr.getAllProfiles);
router.get("/get-response", (req, res, next) => console.log(req.body));
router.put(
  "/profile/experience",
  authMW.auth,
  ...profileFieldValidationMW.experience,
  profileCtr.addProfileExperience
);
router.put(
  "/profile/education",
  authMW.auth,
  ...profileFieldValidationMW.education,
  profileCtr.addProfileEducation
);
router.delete(
  "/profile/experience/:exp_id",
  authMW.auth,
  profileCtr.removeProfileExperienceById
);
router.delete(
  "/profile/education/:edu_id",
  authMW.auth,
  profileCtr.removeProfileEducationById
);
router.post(
  "/profile",
  authMW.auth,
  ...profileFieldValidationMW.profile,
  profileCtr.addProfile
);

router.get("/", (req, res, next) => {
  res.send("<h1>Hello World!</h1>");
});

module.exports = router;
