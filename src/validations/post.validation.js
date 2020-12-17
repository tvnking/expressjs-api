import { Joi } from 'express-validation'

export const createPostValidation = {
  body: Joi.object({
    title: Joi.string()
      .required(),
    description: Joi.string()
      .required(),
    body: Joi.string()
      .required(),
  }),
}
export const editPostValidation = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    body: Joi.string(),
  }),
}
export const deletePostValidation = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
}
export const getPostValidation = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
}
