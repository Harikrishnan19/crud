import React, {useState, useEffect} from 'react'
import {useHistory, useParams, useLocation} from 'react-router-dom'
import NavBar from '../components/NavBar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import qs from 'query-string'
import {editUser, createUser, fetchSpecificUser} from '../services/user.service'
import {useFormik} from 'formik'
import * as yup from 'yup'

const StyledBox = styled(Box)(({ theme }) => ({
    maxWidth : '500px',
    [theme.breakpoints.down('md')]: {
        maxWidth: 'unset',
    },
}));

const validationSchema = yup.object().shape({
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

const AddOrEditUser = () => {

    const [user, setuser] = useState({})

    const location = useLocation()
    const history = useHistory()
    const params = useParams()

    const formik = useFormik({
        enableReinitialize : true,
        initialValues: {
            firstName: user && user.firstName ? user.firstName : '',
            lastName: user && user.lastName ? user.lastName : '',
            email : user && user.email ? user.email : '',
            age : user && user.age ? user.age : '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if(queryParams.action === "add"){
                createUser(values)
                .then(res => {
                    formik.resetForm()
                    alert(`${res.data.firstName} ${res.data.lastName} Added successfully`)
                })
                .catch(err => {
                    if(err.response && err.response.data){
                        alert(err.response.data.error)
                    } else {
                        alert('Something went wrong')
                    }
                })
            } else {
                editUser(params.userId, values)
                .then(res => {
                    history.goBack()
                }).catch(err => {
                    if(err.response && err.response.data){
                        alert(err.response.data.error)
                    } else {
                        alert('Something went wrong')
                    }
                })
            }
        },
    });

    const queryParams = qs.parse(location.search)

    useEffect(() => {
        if(queryParams.action === "edit"){
            fetchSpecificUser(params.userId)
            .then(res => {
                setuser(ps => {
                    return res.data
                })
            })
            .catch(err => {
                if(err.response && err.response.data){
                    alert(err.response.data.error)
                } else {
                    alert('Something went wrong')
                }
            })
        }
    }, [])

    return (
        <NavBar>
            <Container sx={{py:'30px'}}>
                <form onSubmit={formik.handleSubmit}>
                    <Typography variant="h4" gutterBottom component="div">
                        {queryParams.action === "add" ? "Add User" : "Edit User"}
                    </Typography>
                    <StyledBox>
                        <TextField
                            sx={{my:'15px'}}
                            fullWidth
                            label="First name" 
                            name="firstName" 
                            color="primary"
                            type="text" 
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName} />
                        <TextField 
                            sx={{my:'15px'}}
                            fullWidth
                            label="Last name" 
                            name="lastName"
                            color="primary" 
                            type="text"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            />
                        <TextField 
                            sx={{my:'15px'}}
                            name="email"
                            label="Email" 
                            color="primary" 
                            type="email" 
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            fullWidth />
                        <TextField 
                            sx={{my:'15px'}}
                            name="age"
                            color="primary"
                            type="number"
                            label="Age"
                            value={formik.values.age}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.age && Boolean(formik.errors.age)}
                            helperText={formik.touched.age && formik.errors.age}
                            fullWidth />
                        <Stack 
                            justifyContent="space-evenly"
                            direction="row"
                            sx={{width:'100%', marginTop: '25px'}}>
                            <Button variant="outlined" onClick={() => {history.goBack()}}>Back</Button>
                            <Button variant="contained" type="submit" disabled={!formik.dirty}>{queryParams.action === "add" ? "Add" : "Edit"}</Button>
                        </Stack>
                    </StyledBox>
                </form>
            </Container>
        </NavBar>
    )
}

export default AddOrEditUser
