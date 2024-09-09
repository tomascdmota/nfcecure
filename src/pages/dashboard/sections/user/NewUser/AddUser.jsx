import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Chip, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import BreadcrumbsComponent from '../../../components/breadcrumb/breadcrumb'; // Import Breadcrumbs component
import { useNavigate } from 'react-router-dom'; // For navigation

const AddUserPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    position: '',
    department: '',
    permissions: [],
  });

  const navigate = useNavigate(); // Hook to handle navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePermissionsChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      permissions: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch('http://localhost:5225/auth/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("access_token")}` },
      body: JSON.stringify(formData),
    });
    console.log('User data submitted:', formData);
    navigate('/dashboard/user');
  };

  return (
    <Container maxWidth="sm" sx={{ bgcolor: '#f9f9f9', p: 4, borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <BreadcrumbsComponent />
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ textAlign: 'center', fontWeight: 'bold', color: '#333', mb: 2 }}
      >
        Invite your team
      </Typography>

      <Typography 
        variant="body1" 
        sx={{ textAlign: 'center', color: '#777', mb: 3 }}
      >
        Add new members to your project by filling out the details below.
      </Typography>

      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          required
          variant="outlined"
          InputLabelProps={{ style: { color: '#555' } }}
          InputProps={{ style: { fontSize: '1rem', padding: '12px' } }}
          sx={{ bgcolor: '#fff', borderRadius: '8px' }}
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          variant="outlined"
          InputLabelProps={{ style: { color: '#555' } }}
          InputProps={{ style: { fontSize: '1rem', padding: '12px' } }}
          sx={{ bgcolor: '#fff', borderRadius: '8px' }}
        />

        <TextField
          label="Position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          fullWidth
          required
          variant="outlined"
          InputLabelProps={{ style: { color: '#555' } }}
          InputProps={{ style: { fontSize: '1rem', padding: '12px' } }}
          sx={{ bgcolor: '#fff', borderRadius: '8px' }}
        />

        <TextField
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          fullWidth
          required
          variant="outlined"
          InputLabelProps={{ style: { color: '#555' } }}
          InputProps={{ style: { fontSize: '1rem', padding: '12px' } }}
          sx={{ bgcolor: '#fff', borderRadius: '8px' }}
        />

        <FormControl fullWidth variant="outlined" sx={{ bgcolor: '#fff', borderRadius: '8px' }}>
          <InputLabel id="permissions-label" sx={{color:"black"}}>Permissions</InputLabel>
          <Select
            labelId="permissions-label"
            multiple
            value={formData.permissions}
            sx={{color:"black"}}
            onChange={handlePermissionsChange}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    sx={{
                      border: "1px solid",
                      borderColor: value === 'Marketing' ? '#ff69b4' : '#1e90ff',
                      backgroundColor: value === 'Marketing' ? '#f6dfeb' : '#e8f4ff',
                      color: value === 'Marketing' ? '#ff69b4' : '#1e90ff',
                      borderRadius: '4px',
                    }}
                  />
                ))}
              </Box>
            )}
            inputProps={{ 'aria-label': 'Permissions' }}
          >
            <MenuItem value="Marketing">Marketing</MenuItem>
            <MenuItem value="Product Management">Product Management</MenuItem>
          </Select>
        </FormControl>

        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ mt: 2, py: 1.5, fontWeight: 'bold', fontSize: '1rem', textTransform: 'none', borderRadius: '8px' }}
        >
          Add User
        </Button>
      </Box>
    </Container>
  );
};

export default AddUserPage;
