const Joi = require('joi')

const blogPostSchema = Joi.object().keys({ 
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().lowercase().required(), 
    password:Joi.string().lowercase()
  });

  module.exports = blogPostSchema;