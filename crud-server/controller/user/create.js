const User = require('../../models/user')
const { isEmpty } = require('lodash')
const logger = require('../../utils/logger')


const createUser = async (req, res) => {

    try {
        const isPresent = await isEmailPresent(req.body.email)
        if(isPresent){
            res.status(409).send({error : `${req.body.email} already present`})
            return
        }
    } catch (err) {
        logger.error(err);
        res.status(500).send({error : error.message})
        return
    }

    try{
        const createdUserDoc = await createUserObj(req.body).save()
        res.status(201).send({data : createdUserDoc})
    }catch(err){
        logger.error(err);
        res.status(500).send({error : error.message})
    }
}

function createUserObj(requestBody){
    const userObj = new User()
    userObj.firstName = requestBody.firstName
    userObj.lastName = requestBody.lastName
    userObj.email = requestBody.email
    userObj.age = requestBody.age
    return userObj
}

async function isEmailPresent(email){
    const doc = await User.findOne({email : email}).select('_id').lean()
    if(isEmpty(doc)){
        return false
    }
    return true
}

module.exports = createUser