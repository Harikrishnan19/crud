const logger = require('../../utils/logger')
const User = require('../../models/user') 


const readUser = async (req, res) => {

    try{
        const userDocs = await fetchUsers()
        res.status(200).send({data : userDocs})
    }catch(err){
        logger.error(err);
        res.status(500).send({error : error.message})
    }
}

function fetchUsers(){
    return User.find({}).lean()
}

module.exports = readUser