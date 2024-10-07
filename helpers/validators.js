import Joi from "joi";

export const isAtLeast18YearsOld = (dateString) => {
  const [day, month, year] = dateString.split("/").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthday =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());
  if (!hasHadBirthday) {
    age--;
  }
  return age >= 18;
};

export const validateNewCandidate = (data) => {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    dob: Joi.string()
      .required()
      .custom((value, helper) => {
        if (isAtLeast18YearsOld(value)) return value;
        return helper.message("You must be 18 year old");
      }),
    residence_address: Joi.object({
      street1: Joi.string().required(),
      street2: Joi.string().required(),
    }).required(),
    permanent_address: Joi.object({
      street1: Joi.string().required(),
      street2: Joi.string().required(),
    }).required(),
  });
  return schema.validate(data);
};
