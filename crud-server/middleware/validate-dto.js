const logger = require('../utils/logger')

function validateDto(schema) {
    return async (req, res, next) => {
        try {
            const validatedBody = await schema.validate(req.body)
            req.body = validatedBody
            next()
        } catch(error) {
            logger.error(error)
            res.status(400).json({error : error.message})
        }
    }
}

module.exports = validateDto