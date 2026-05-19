import Joi from 'joi';

export const animalValidation = Joi.object({
  animalId: Joi.string().required(),
  name: Joi.string().required(),
  type: Joi.string().valid('cow', 'buffalo', 'goat', 'sheep', 'other').required(),
  breed: Joi.string(),
  age: Joi.object({
    years: Joi.number().min(0),
    months: Joi.number().min(0).max(11)
  }),
  weight: Joi.object({
    value: Joi.number().positive(),
    unit: Joi.string()
  }),
  gender: Joi.string().valid('male', 'female').required(),
  identificationMark: Joi.string()
});