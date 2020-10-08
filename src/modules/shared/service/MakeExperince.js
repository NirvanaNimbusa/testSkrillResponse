class MakeExperience {
  constructor(experience) {
    this.experience = experience;
  }
  makeProfileExperience = () => {
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = this.experience;

    const experienceFields = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    return experienceFields;
  };
}

module.exports = MakeExperience;
