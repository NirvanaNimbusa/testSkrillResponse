const jwt = require("jsonwebtoken");
const config = require("config");
const Message = require("../../../base/shared/MessageModel/MessageModel");

exports.auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send(new Message("Authorizaton denied"));
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).send(new Message("Invalid token"));
  }
};
