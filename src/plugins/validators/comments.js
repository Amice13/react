import Joi from 'joi'

const body = Joi.object({
  id: Joi.number()
    .integer()
    .min(1)
    .label('ID')
    .description('Primary key, auto-incremented by the database'),
  userId: Joi.string()
    .required()
    .label('User ID')
    .description('The ID of the user who created the comment'),
  message: Joi.string()
    .required()
    .label('Message')
    .description('The content of the comment'),
  entityType: Joi.string()
    .required()
    .label('Entity Type')
    .description('The type of entity the comment is related to (e.g., post, article)'),
  entityId: Joi.string()
    .required()
    .label('Entity ID')
    .description('The ID of the entity the comment is related to'),
  replyTo: Joi.number()
    .integer()
    .min(1)
    .allow(null)
    .label('Reply To')
    .description('The ID of the comment this comment is replying to, if applicable'),
  createdAt: Joi.number()
    .integer()
    .min(1)
    .allow(null)
    .label('Created At')
    .description('Timestamp when the comment was created'),
  createdBy: Joi.number()
    .integer()
    .min(1)
    .allow(null)
    .label('Created By')
    .description('ID of the user who created the comment'),
  updatedAt: Joi.number()
    .integer()
    .min(1)
    .allow(null)
    .label('Updated At')
    .description('Timestamp when the comment was last updated'),    
  updatedBy: Joi.number()
    .integer()
    .min(1)
    .allow(null)
    .label('Updated By')
    .description('ID of the user who last updated the comment'),
})

export default body
