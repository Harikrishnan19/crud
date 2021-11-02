const logger = require('../../utils/logger')
const User = require('../../models/user')


const readUser = async (req, res) => {

    try{
        const userDoc = await fetchUser(req.params.id)
        res.status(200).send({data : userDoc})
    }catch(err){
        logger.error(err);
        res.status(500).send({error : error.message})
    }
}

function fetchUser(id){
    return User.findOne({_id : id}).lean()
}

module.exports = readUser