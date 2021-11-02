const yup = require('yup')

module.exports = yup.object().shape({
    firstName : yup.string()
                    .required('Please enter your first name')
                    .matches(/^[A-Za-z ]*$/, 'Invalid first name')
                    .min(2, 'Too short')
                    .max(40, 'Too long'),
    lastName : yup.string()
                    .required('Please enter your last name')
                    .matches(/^[A-Za-z ]*$/, 'Invalid last name')
                    .min(2, 'Too short')
                    .max(40, 'Too long'),
    email : yup.string()
                .required('Please enter your email address')
                .email('Invalid email address'),
    age : yup.number()
                .min(1, 'Age cannot be less than one')
                .max(100, 'Age cannot be greater than hundred')
                .required('Please enter your age')
})