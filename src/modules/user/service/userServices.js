const User = require("../Model/userModel");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

class UserSrevices {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
  addUser = async (cb) => {
    const avatar = gravatar.url(this.email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    const user = new User({
      name: this.name,
      email: this.email,
      avatar,
      password: this.password,
    });

    const stalt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(this.password, stalt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    cb(payload);
  };
}

module.exports = UserSrevices;
