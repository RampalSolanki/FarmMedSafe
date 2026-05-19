import Joi from 'joi';

export const medicineEntryValidation = Joi.object({
  animalId: Joi.string().required(),
  medicineId: Joi.string().required(),
  doseGiven: Joi.object({
    value: Joi.number().positive().required(),
    unit: Joi.string().required()
  }),
  route: Joi.string().valid('oral', 'injection', 'topical', 'intravenous').required(),
  dateGiven: Joi.date(),
  reason: Joi.string()
});