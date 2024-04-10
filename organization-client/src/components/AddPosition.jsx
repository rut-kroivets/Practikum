import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import RoleDetails from '../Mobx/RoleDetails';
import { observer } from "mobx-react"; // Import observer from mobx-react
import PositionDetails from "../Mobx/PositionDetails";
import EmployeeDetails from "../Mobx/EmployeeDetails";

const AddPosition = observer(({ employeeId, close }) => {
    const { register, handleSubmit, reset } = useForm();
    const [roles, setRoles] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const rolesData = await RoleDetails.getRole();
            setRoles(rolesData);
        };
        fetchData();
    }, []);

    const addPosition = async (formData) => {
            const position = {
                roleId: formData.roleId,
                enterDate: formData.enterDate,
                isAdmin: formData.isAdmin,
                employeeId: employeeId
            };
            await PositionDetails.addPosition(position);
            reset(); // Reset form fields after submission
            setSuccessMessage('Position successfully added'); // Set success message
            // Clear success message after 3 seconds
        // }
        setTimeout(() => {
            setSuccessMessage('');
        }, 2000);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for a short delay
        close();
    };

    return (
        <Card sx={{ minWidth: 275 }} component="form" onSubmit={handleSubmit(addPosition)}>
            {successMessage && (
                <CardContent>
                    <p style={{ color: 'green' }}>{successMessage}</p>
                </CardContent>
            )}
            <CardContent>
                <InputLabel>Start of role*</InputLabel>
                <TextField
                    {...register('enterDate')}
                    id="outlined-basic"
                    sx={{ m: 1, width: '25ch' }}
                    type="date"
                    variant="outlined"
                    required
                />
                <br />
                <FormControl sx={{ m: 1, width: '25ch' }}>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                        {...register('roleId')}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Role"
                        defaultValue=""
                    >
                        {roles.map(role => (
                            <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br />
                <FormControlLabel
                    {...register('isAdmin')}
                    control={<Switch defaultChecked />}
                    label="Is admin"
                />
            </CardContent>
            <CardActions>
                <Button type="submit">Add</Button>
            </CardActions>

        </Card>
    );
});

export default AddPosition;
