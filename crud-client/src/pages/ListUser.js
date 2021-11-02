import React, {useEffect, useState} from 'react'
import {useHistory, useParams, useLocation} from 'react-router-dom'
import NavBar from '../components/NavBar'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StickyHeadTable from '../components/StickyHeaderTable';
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import { fetchUsers } from '../services/user.service'

const ListUser = () => {

    const [users, setUsers] = useState({
        loading : true,
        users : [] 
    })

    const history = useHistory()

    useEffect(() => {
        fetchUsers()
        .then(res => {
            setUsers((ps) => {
                return {
                    ...ps,
                    loading : false,
                    users : res.data
                }
            })
        })
        .catch(err => {
            if(err.response && err.response.data){
                alert(err.response.data.error)
            } else {
                alert('Something went wrong')
            }
        })
    }, [])

    const onAddClick = (e) => {
        history.push('/user?action=add')
    }
    
    return (
        <NavBar>
            <Container >
                {
                    !users.loading ? 
                        <>
                            <Typography variant="h4" sx={{marginTop: '1.5rem'}} gutterBottom component="div">
                                Users
                            </Typography>
                            {
                                users.users.length > 0 ? 
                                <>
                                    <Stack 
                                        mb={3}
                                        justifyContent="flex-end"
                                        direction="row" >
                                        <Button variant="contained" startIcon={<AddIcon />} onClick={onAddClick}>Add</Button>
                                    </Stack>
                                    <StickyHeadTable users={users.users} setUsers={setUsers}/>
                                </> : 
                                <Stack sx={{py:'7em'}} alignItems="center">
                                    <Typography sx={{textAlign : "center"}} variant="h6" gutterBottom component="div">Welcome, seems you are new. Add users to kick start</Typography>
                                    <Button variant="contained" startIcon={<AddIcon />} onClick={onAddClick}>Add</Button>
                                </Stack>
                            }
                        </> : null
                }
            </Container>
        </NavBar>
    )
}

export default ListUser
