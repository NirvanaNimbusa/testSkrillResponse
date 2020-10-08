const User = require("../Model/userModel");
const Message = require("../../../base/shared/MessageModel/MessageModel");
const UserSrevices = require("../service/userServices");
const jwt = require("jsonwebtoken");
const config = require("config");
const Profile = require("../../shared/models/ProfileModel");

exports.addUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send(new Message("User already exists!"));
    }
    let service = new UserSrevices(name, email, password);
    service.addUser((payload) => {
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findByIdAndRemove({ _id: req.user.id });
    res.send(new Message("User deleted"));
  } catch (error) {
    console.log(error);
    res.status(500).send(new Message("Server Error"));
  }
};
