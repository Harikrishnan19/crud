import * as React from 'react';
import {useHistory} from 'react-router-dom'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Stack from '@mui/material/Stack'
import { deleteUser } from '../services/user.service'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const columns = [
  { id: 'firstName', label: 'First Name', minWidth: 170 },
  { id: 'lastName', label: 'Last Name', minWidth: 100 },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170
  },
  {
    id: 'age',
    label: 'Age',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'action',
    label: '',
    minWidth: 170,
    align: 'center',
    render: (onEditClick, onDeleteClick) => {

      return (
        <Stack direction="row" justifyContent="center">
          <IconButton onClick={onEditClick}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={onDeleteClick}>
            <DeleteIcon color="error" />
          </IconButton>
        </Stack>
      );
    },
  },
];

// const rows = [
//     { firstName: 'Hari',lastName : 'Manickam', email: 'harikrishnan97arun@gmail.com', age: 23},
//     { firstName: 'Hari',lastName : 'Manickam', email: 'harikrishnan97arun@gmail.com', age: 23},
//     { firstName: 'Hari',lastName : 'Manickam', email: 'harikrishnan97arun@gmail.com', age: 23}
// ];

export default function StickyHeadTable(props) {

    const { users, setUsers } = props

    const history = useHistory()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onEditClick = (id) => {
      history.push(`/user/${id}?action=edit`)
    }

    const onDeleteClick = (id) => {
      deleteUser(id)
      .then(res => {
        setUsers((ps) => {
          return {
            ...ps,
            users : ps.users.filter(user => user._id !== id)
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
    }

    return (
        <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: "26rem" }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }} >
                      {column.label}
                    </StyledTableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => {
                    return (
                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={user._id}>
                        {columns.map((column) => {

                        return (
                            <StyledTableCell key={column.id} align={column.align}>
                              {column.id === 'action' ? column.render(() => onEditClick(user._id), () => onDeleteClick(user._id)) : user[column.id]}
                            </StyledTableCell>
                        );
                        })}
                    </StyledTableRow>
                    );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage} />
        </Paper>
    );
}