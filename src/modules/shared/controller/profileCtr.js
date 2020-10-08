const Profile = require("../models/ProfileModel");
const Message = require("../../../base/shared/MessageModel/MessageModel");
const MakeProfile = require("../service/MakeProfile");
const Experience = require("../service/MakeExperince");
const Education = require("../service/MakeEducation");
const request = require("request");
const config = require("config");

exports.getCurrentProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res
        .status(400)
        .send(new Message("Profile not found for this user"));
    }
    res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).send(new Message("Server Error"));
  }
};

exports.addProfile = async (req, res, next) => {
  let makeProfile = new MakeProfile(req.body, req.user.id);
  let profileFields = makeProfile.makeProfile();
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.send(profile);
    }
    profile = new Profile(profileFields);
    await profile.save();
    res.send(profile);
  } catch (error) {
    console.log(error);
  }
};

exports.getAllProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    if (!profiles) {
      return res
        .status(400)
        .send(new Message("Profile not found for this user"));
    }
    res.json(profiles);
  } catch (error) {
    console.log(error);
    res.status(500).send(new Message("Server Error"));
  }
};

exports.getProfileById = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res
        .status(400)
        .send(new Message("Profile not found for this user"));
    }
    res.json(profile);
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res
        .status(400)
        .send(new Message("Profile not found for this user"));
    }
    console.log(error);
    res.status(500).send(new Message("Server Error"));
  }
};

exports.addProfileExperience = async (req, res, next) => {
  const experience = new Experience(req.body);
  const newExp = experience.makeProfileExperience();
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error);
    res.send(new Message("Server Error"));
  }
};

exports.removeProfileExperienceById = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.experience
      .map((item) => item)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error);
    res.send(new Message("Server Error"));
  }
};

exports.addProfileEducation = async (req, res, next) => {
  const education = new Education(req.body);
  const newEdu = education.makeProfileEducation();
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEdu);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error);
    res.send(new Message("Server Error"));
  }
};

exports.removeProfileEducationById = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.education
      .map((item) => item)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error);
    res.send(new Message("Server Error"));
  }
};

exports.getGithubRepos = async (req, res, next) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubClientSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (error, response, body) => {
      if (error) console.log(error);
      if (response.statusCode != 200) {
        return res
          .status(404)
          .send(new Message("No github profile found for this user"));
      }
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.log(error);
    res.send(new Message("Server Error"));
  }
};
