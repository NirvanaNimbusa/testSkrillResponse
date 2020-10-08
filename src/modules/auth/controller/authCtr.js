const Message = require("../../../base/shared/MessageModel/MessageModel");
const User = require("../../user/Model/userModel");

exports.auth = async (req, res, next) => {
  try {
    const userData = await User.findById(req.user.id).select("-password");
    return res.send(userData);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(new Message("Server Error"));
  }
};
