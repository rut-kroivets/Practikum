import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignInSide() {

    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({
        userName: '',
        password: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        login(formData);
    };

    const login = async (data) => {
        try {
            const response = await axios.post("https://localhost:7163/api/Auth", data, {
                headers: {
                    'Content-Type': 'application/json' // Set the appropriate content type
                }
            });
            console.log('Login success:', response.data);
            localStorage.setItem('token', response.token); 
            navigate('/allEmployee');
        } catch (error) {
            console.error('Error login:', error);
            alert("Login faild, please enter again")
        }
       
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const defaultTheme = createTheme();

    return (
        <ThemeProvider theme={defaultTheme}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container component="main" sx={{ minHeight: '100vh', minWidth: '99vw' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="userName" // Change id to userName
                                    label="User name"
                                    name="userName" // Change name to userName
                                    autoComplete="name"
                                    autoFocus
                                    type="text"
                                    value={formData.userName}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Typography variant="body2" color="text.secondary" align="center">
                                    {'Don\'t have an account? '}
                                    <Link color="primary" href="/register">
                                        Sign Up
                                    </Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </ThemeProvider>
    );
}

export default SignInSide;
