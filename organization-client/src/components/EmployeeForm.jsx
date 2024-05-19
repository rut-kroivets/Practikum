import * as React from 'react';
import EmployeeDetails from '../Mobx/EmployeeDetails';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Paper } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import { useEffect } from 'react';
import AddPosition from './AddPosition';
import { Navigate } from 'react-router-dom';

const EmployeeForm = observer(() => {

    const [isAdd, setIsAdd] = useState(true);
    const location = useLocation();
    const [addRoleOpen, setAddRoleOpen] = useState(false);
    const { employee } = location.state;
    const navigate = useNavigate();
    useEffect(() => {
        if (employee.identity == "") {
            setIsAdd(true);
        } else {
            setIsAdd(false);
        }
    }, [employee])
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const handleSubmitForm = (form) => {
        if (isAdd)
            addNewEmployee(form);
        else
            editEmployee(form);
    }
    async function addNewEmployee(form) {//Function to add a new Employee
        console.log(form)
        await EmployeeDetails.addEmployee(form);
        reset(); // Reset form fields after submission
        navigate('/allEmployee');
    }
    async function editEmployee(form) {

        console.log(form)
        // form.dateOfBirth = new Date(form.dateOfBirth);
        // form.startOfWork=new Date(form.startOfWork);
        // form.dateOfBirth=form.dateOfBirth.toISOString();
        // form.startOfWork=form.startOfWork.toISOString();
        await EmployeeDetails.updateEmployee(form, employee.id);
        navigate('/allEmployee');
    }

    const addRole = () => {
        setAddRoleOpen(!addRoleOpen);
    }

    return (
        <React.Fragment>

            <Paper onSubmit={handleSubmit(handleSubmitForm)} component="form">
                {isAdd ? <DialogTitle>Add Employee:</DialogTitle> : <DialogTitle>Edit Employee:</DialogTitle>}
                <IconButton
                    aria-label="close"
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    onClick={() => { navigate('/allEmployee') }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent >
                    <TextField
                        {...register('identity', {
                            minLength: { value: 9, message: "Id must be at 9 numbers" },
                            maxLength: { value: 9, message: "Id must be at 9 numbers" }
                        })}
                        id="outlined-basic"
                        sx={{ m: 1, width: '25ch' }}
                        label="Id"
                        type="text"
                        defaultValue={employee.identity}
                        required
                        variant="outlined"
                        error={!!errors.identity}
                        helperText={errors.identity ? errors.identity.message : ""}
                    />
                    <br />
                    <TextField
                        {...register('firstName', {
                            minLength: { value: 2, message: "First name must be at least 2 characters" },
                            maxLength: { value: 15, message: "First name must be at most 15 characters" }
                        })}
                        id="outlined-basic"
                        sx={{ m: 1, width: '25ch' }}
                        label="First name"
                        type="text"
                        defaultValue={employee.firstName}
                        required
                        variant="outlined"
                        error={!!errors.firstName}
                        helperText={errors.firstName ? errors.firstName.message : ""}
                    />
                    <br />
                    <TextField
                        {...register('lastName', {
                            minLength: { value: 2, message: "Last name must be at least 2 characters" },
                            maxLength: { value: 15, message: "Last name must be at most 15 characters" }
                        })}
                        id="outlined-basic"
                        sx={{ m: 1, width: '25ch' }}
                        label="Last name"
                        type="text"
                        variant="outlined"
                        defaultValue={employee.lastName}
                        required
                        error={!!errors.lastName}
                        helperText={errors.lastName ? errors.lastName.message : ""}
                    />
                    <br />
                    <FormControl sx={{ m: 1, width: '25ch' }}>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                            {...register('gender')}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={employee.gender} // Set the value to the gender value of the employee
                            label="Gender"
                        >
                            <MenuItem value={1}>Male</MenuItem>
                            <MenuItem value={2}>Female</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <InputLabel>Date of birth*</InputLabel>
                    <TextField
                        {...register('dateOfBirth')}
                        id="outlined-basic"
                        sx={{ m: 1, width: '25ch' }}
                        type="date"
                        variant="outlined"
                        defaultValue={employee.dateOfBirth ? employee.dateOfBirth.split('T')[0] : ''}
                        required
                    />
                    <br />
                    <InputLabel>Start of work*</InputLabel>
                    <TextField
                        {...register('startOfWork')}
                        id="outlined-basic"
                        sx={{ m: 1, width: '25ch' }}
                        type="date"
                        variant="outlined"
                        defaultValue={employee.startOfWork ? employee.startOfWork.split('T')[0] : ''}
                        required
                    />
                    <br />
                    {!isAdd && <Button variant="outlined" sx={{ m: 1, width: '27ch', height: '7ch', color: 'black' }} onClick={addRole}>Add role</Button>}
                    <DialogActions>
                        {isAdd ? <Button type="submit" >Add</Button> : <Button type="submit" >Edit</Button>}
                    </DialogActions>
                </DialogContent>
            </Paper>
            {addRoleOpen && <AddPosition employeeId={employee.id} close={addRole} />}
        </React.Fragment>
    );
});

export default EmployeeForm;
