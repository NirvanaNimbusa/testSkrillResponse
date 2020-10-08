class MakeExperience {
  constructor(experience) {
    this.experience = experience;
  }
  makeProfileEducation = () => {
    const {
      institute,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = this.experience;

    const experienceFields = {
      institute,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    return experienceFields;
  };
}

module.exports = MakeExperience;
