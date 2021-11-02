const route = require('express').Router()

const userValidationSchema = require('../helper/user-schema')
const validateDto = require('../middleware/validate-dto') 

const createUser = require('../controller/user/create')
const editUser = require('../controller/user/edit')
const readUser = require('../controller/user/read')
const readSpecificUser = require('../controller/user/specific-read')
const deleteUser = require('../controller/user/delete')

route.post('/create', validateDto(userValidationSchema), createUser)
route.get('/read', readUser)
route.get('/:id/read', readSpecificUser)
route.put('/:id/edit', validateDto(userValidationSchema), editUser)
route.delete('/:id/delete', deleteUser)

module.exports = route