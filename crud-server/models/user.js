const { model, Schema } = require('mongoose')

const UserSchema = new Schema({
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    age : {
        type : Number
    }
}, {timestamps: true})

module.exports = model('users', UserSchema)