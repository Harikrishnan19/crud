const User = require('../../models/user')
const { isEmpty } = require('lodash')
const logger = require('../../utils/logger')


const editUser = async (req, res) => {

    try {
        const isPresent = await isEmailPresent(req.body.email, req.params.id)
        if(isPresent){
            res.status(409).send({error : `${req.body.email} already present!`})
            return
        }
    } catch(error) {
        logger.error(err)
        res.status(500).send({error : error.message})
        return
    }

    try{
        const udpatedUserDoc = await updateUser({_id : req.params.id}, {$set : createUserObj(req.body)})
        res.status(200).send({data : udpatedUserDoc})
    }catch(err){
        logger.error(err)
        res.status(500).send({error : error.message})
    }
}

function createUserObj(requestBody){
    let fieldsToSet = {}

    if(requestBody.hasOwnProperty('email')){
        fieldsToSet.email = requestBody.email
    }

    if(requestBody.hasOwnProperty('firstName')){
        fieldsToSet.firstName = requestBody.firstName
    }

    if(requestBody.hasOwnProperty('lastName')){
        fieldsToSet.lastName = requestBody.lastName
    }

    if(requestBody.hasOwnProperty('age')){
        fieldsToSet.age = requestBody.age
    }

    return fieldsToSet
}

function updateUser(query, update){
    return User.findOneAndUpdate(query, update, {new: true}).lean()
}

async function isEmailPresent(email, id){
    const doc = await User.findOne({email : email, _id: {$ne: id}}).select('_id').lean()
    if(isEmpty(doc)){
        return false
    }
    return true
}

module.exports = editUser