import * as React from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

export default function Form() {
    return (
        <Grid container spacing={3}>
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="first-name" required>
                    First name
                </FormLabel>
                <OutlinedInput
                    {...register('firstName', {
                        minLength: { value: 2, message: "First name must be at least 2 characters" },
                        maxLength: { value: 15, message: "First name must be at most 15 characters" }
                    })}
                    sx={{ m: 1, width: '25ch' }}
                    label="First name"
                    type="text"
                    defaultValue={employee.firstName}
                    required
                    variant="outlined"
                    error={!!errors.firstName}
                    helperText={errors.firstName ? errors.firstName.message : ""}
                />
            </FormGrid>
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="last-name" required>
                    Last name
                </FormLabel>
                <OutlinedInput
                    {...register('lastName', {
                        minLength: { value: 2, message: "Last name must be at least 2 characters" },
                        maxLength: { value: 15, message: "Last name must be at most 15 characters" }
                    })}
                    sx={{ m: 1, width: '25ch' }}
                    label="Last name"
                    type="text"
                    variant="outlined"
                    defaultValue={employee.lastName}
                    required
                    error={!!errors.lastName}
                    helperText={errors.lastName ? errors.lastName.message : ""}
                />
            </FormGrid>
            <FormGrid item xs={12}>
                <FormLabel htmlFor="address1" required>
                    Address line 1
                </FormLabel>
                <OutlinedInput
                    id="address1"
                    name="address1"
                    type="address1"
                    placeholder="Street name and number"
                    autoComplete="shipping address-line1"
                    required
                />
            </FormGrid>
            <FormGrid item xs={12}>
                <FormLabel htmlFor="address2">Address line 2</FormLabel>
                <OutlinedInput
                    id="address2"
                    name="address2"
                    type="address2"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    autoComplete="shipping address-line2"
                    required
                />
            </FormGrid>
            <FormGrid item xs={6}>
                <FormLabel htmlFor="city" required>
                    City
                </FormLabel>
                <OutlinedInput
                    id="city"
                    name="city"
                    type="city"
                    placeholder="New York"
                    autoComplete="City"
                    required
                />
            </FormGrid>
            <FormGrid item xs={6}>
                <FormLabel htmlFor="state" required>
                    State
                </FormLabel>
                <OutlinedInput
                    id="state"
                    name="state"
                    type="state"
                    placeholder="NY"
                    autoComplete="State"
                    required
                />
            </FormGrid>
            <FormGrid item xs={6}>
                <FormLabel htmlFor="zip" required>
                    Zip / Postal code
                </FormLabel>
                <OutlinedInput
                    id="zip"
                    name="zip"
                    type="zip"
                    placeholder="12345"
                    autoComplete="shipping postal-code"
                    required
                />
            </FormGrid>
            <FormGrid item xs={6}>
                <FormLabel htmlFor="country" required>
                    Country
                </FormLabel>
                <OutlinedInput
                    id="country"
                    name="country"
                    type="country"
                    placeholder="United States"
                    autoComplete="shipping country"
                    required
                />
            </FormGrid>
            <FormGrid item xs={12}>
                <FormControlLabel
                    control={<Checkbox name="saveAddress" value="yes" />}
                    label="Use this address for payment details"
                />
            </FormGrid>
        </Grid>
    );
}