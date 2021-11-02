const logger = require('../../utils/logger')
const User = require('../../models/user') 


const deleteUser = async (req, res) => {

    try{
        const deletedUserResult = await deleteUserDoc(req.params.id)
        res.status(200).send({data : 'Deleted successfully'})
    }catch(err){
        logger.error(err);
        res.status(500).send({error : error.message})
    }
}

function deleteUserDoc(id){
    return User.deleteOne({_id : id})
}

module.exports = deleteUser