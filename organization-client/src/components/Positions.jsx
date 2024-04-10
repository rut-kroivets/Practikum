import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import PositionDetails from "../Mobx/PositionDetails";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import RoleDetails from "../Mobx/RoleDetails";
const Positions = () => {
    const location = useLocation();
    const { employeeId, fName, lName } = location.state;
    const [positions, setPositions] = useState([]);
    const [id, setId] = useState(0);
    const [editedRowIndex, setEditedRowIndex] = useState(null);
    const [roles, setRoles] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            const positions = await PositionDetails.getPosition();
            setPositions(positions.filter(p => p.employeeId === employeeId));
            const rolesData = await RoleDetails.getRole();
            setRoles(rolesData);
        };
        fetchData();
    }, []);

    function createData(index, enterDate, role, isAdmin, id) {
        return { index, enterDate, role, isAdmin, id };
    }

    const rows = positions ? positions.map((v, index) => {
        return createData(index + 1, v.enterDate, v.role.name, v.isAdmin.toString(), v.id);
    }) : [];

    const toggleDisable = (index) => {
        setEditedRowIndex(index === editedRowIndex ? null : index);
    };

    const handleSave = async (form, id) => {
        const updatedItem = {
            roleId: form.roleId,
            enterDate: form.enterDate,
            isAdmin: form.isAdmin,
            employeeId: employeeId
        };
        await PositionDetails.updatePosition(updatedItem, id);
        setEditedRowIndex(null);
    };

    const handleClickSave = (form, id) => {
        console.log(form)
        handleSave(form, id);
    };

    return (
        <>
            {positions.length !== 0 ?
                <Card>
                    <h2>The positions of {fName} {lName}</h2>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 350 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="left">Start Date</TableCell>
                                    <TableCell align="left">Role</TableCell>
                                    <TableCell align="left">Is Admin</TableCell>
                                    <TableCell align="left">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows && rows.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{row.index}</TableCell>
                                        <TableCell align="left">
                                            <TextField
                                                {...register('enterDate')}
                                                id={`enterDate-${index}`}
                                                variant="standard"
                                                defaultValue={row.enterDate ? row.enterDate.split('T')[0] : ''}
                                                disabled={editedRowIndex !== index}
                                                type="date"
                                            />
                                        </TableCell>
                                        <TableCell align="left">
                                            <FormControl sx={{ m: 1, width: '25ch' }}>
                                                <InputLabel id={`role-label-${index}`}>{row.role}</InputLabel>
                                                <Select
                                                    {...register('roleId')}
                                                    labelId={`role-label-${index}`}
                                                    variant="standard"
                                                    id={`role-select-${index}`}
                                                    label="role"
                                                    defaultValue=""
                                                    disabled={editedRowIndex !== index}
                                                    onChange={(e) => {
                                                        // Update form data with selected value
                                                        const selectedRoleId = e.target.value;
                                                        const updatedFormData = { ...getValues(), roleId: selectedRoleId };
                                                        setValue('roleId', selectedRoleId); // Trigger form registration
                                                        setFormData(updatedFormData); // Update local form data state if needed
                                                    }}
                                                >
                                                    {roles.map(role => (
                                                        <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </TableCell>

                                        <TableCell align="left">
                                            <TextField
                                                {...register('isAdmin')}
                                                id={`isAdmin-${index}`}
                                                variant="standard"
                                                defaultValue={row.isAdmin}
                                                disabled={editedRowIndex !== index}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {editedRowIndex === index ?
                                                <IconButton
                                                    aria-label="save"
                                                    size="large"
                                                    disabled={editedRowIndex !== index}
                                                    onClick={() => handleClickSave(rows[index], row.id)}
                                                >
                                                    <SaveIcon fontSize="inherit" />
                                                </IconButton> :
                                                <IconButton
                                                    aria-label="edit"
                                                    size="large"
                                                    onClick={() => toggleDisable(index)}
                                                >
                                                    <EditIcon fontSize="inherit" />
                                                </IconButton>}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card> : <p style={{ color: 'red' }}>No Positions</p>
            }
        </>
    );
};

export default Positions;
