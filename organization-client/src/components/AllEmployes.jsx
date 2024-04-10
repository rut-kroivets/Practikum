import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeDetails from '../Mobx/EmployeeDetails';
import { observer } from 'mobx-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import WorkIcon from '@mui/icons-material/Work';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import * as XLSX from 'xlsx'; // Import xlsx library
import RoleDetails from '../Mobx/RoleDetails';

const Search = styled('div')(({ theme }) => ({

    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const StyledAppBar = styled(AppBar)({
    top: 0,
    position: 'fixed', // Set position to fixed
    width: '100%', // Set width to 100% of the viewport
});


const AllEmployees = observer(() => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('');
    const [isAddRole, setIsAddRole] = useState(false);
    const [role, setRole] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const employees = await EmployeeDetails.getEmployee();
            setData(employees);
        };
        fetchData();
    }, [data]);

    const deleteEmployee = async (id) => {
        console.log(id)
        if (id != null) {
            try {
                await EmployeeDetails.deleteEmployee(id);
                setData((prevData) => prevData.filter((employee) => employee.id !== id));
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        } else {
            console.error('Employee ID is null.');
        }
    };

    const editEmployee = (selectEmployee) => {
        const employee = {
            id: selectEmployee.id,
            identity: selectEmployee.identity,
            firstName: selectEmployee.firstName,
            lastName: selectEmployee.lastName,
            startOfWork: selectEmployee.startOfWork,
            dateOfBirth: selectEmployee.dateOfBirth,
            gender: selectEmployee.gender
        }
        navigate('/formEmployee', { state: { employee } });
    };

    const addEmployee = () => {
        const employee = {
            identity: "",
            firstName: "",
            lastName: "",
            startOfWork: "",
            dateOfBirth: "",
            gender: ""
        };
        navigate('/formEmployee', { state: { employee } });
    };

    const positionEmployee = (employeeId, fName, lName) => {
        navigate('/position', { state: { employeeId, fName, lName } });
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredData = data.filter((employee) =>
        Object.values(employee).some((value) =>
            typeof value === 'string' && value.toLowerCase().includes(filter.toLowerCase())
        )
    );

    // Function to export data to Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Employees");
        XLSX.writeFile(wb, "employees.xlsx");
    };
    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };
    const addRole = async () => {
        setIsAddRole(true)
    }
    const submitRole = async () => {
        RoleDetails.addRole(role);
        setIsAddRole(false);
    }
    return (
        <div>
            <StyledAppBar>
                <AppBar position="static" sx={{ minWidth: '90vw' }}>
                    <Toolbar>
                        <Button variant="contained" onClick={addEmployee} sx={{ margin: '0.5rem', bgcolor: 'gray' }}>Add Employee</Button>
                        <Button variant="contained" onClick={exportToExcel} sx={{ margin: '0.5rem', bgcolor: 'gray' }}>Export to Excel</Button>
                        {!isAddRole ?
                            <Button variant="contained" onClick={addRole} sx={{ margin: '0.5rem', bgcolor: 'gray' }}>Add Role</Button>
                            :
                            <Button variant="contained" onClick={submitRole} sx={{ margin: '0.5rem', bgcolor: 'gray' }}>Save Role</Button>}
                        {isAddRole && <TextField
                            id="outlined-basic"
                            sx={{ m: 1, width: '25ch' }}
                            type="text"
                            variant="outlined"
                            value={role}
                            onChange={handleRoleChange}
                        />}
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            ORGANIZATION
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                value={filter}
                                onChange={handleFilterChange}
                                id="filter"
                                label={<SearchIcon></SearchIcon>}
                                variant="outlined"
                            />
                        </Search>
                    </Toolbar>
                </AppBar>
            </StyledAppBar>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3em' }} >
                <TableContainer component={Paper} sx={{ minWidth: '99vw' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'gray' }}>
                                <TableCell>ID</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Start Of Work</TableCell>
                                <TableCell>Jobs</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.identity}</TableCell>
                                    <TableCell>{row.firstName}</TableCell>
                                    <TableCell>{row.lastName}</TableCell>
                                    <TableCell>{row.startOfWork}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="edit" size="large" onClick={() => positionEmployee(row.id, row.firstName, row.lastName)}>
                                            <WorkIcon fontSize="inherit" />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton aria-label="edit" size="large" onClick={() => editEmployee(row)}>
                                            <EditIcon fontSize="inherit" />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton aria-label="delete" size="large" onClick={() => deleteEmployee(row.id)}>
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div >
    );
});

export default AllEmployees;
