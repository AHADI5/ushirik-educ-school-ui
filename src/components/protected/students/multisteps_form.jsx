import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from '@mui/material';

const steps = ['Details', 'Parent', 'Address'];

const MultiStepForm = ({ onSubmit, fetchClassrooms }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    firstName: '',
    gender: '',
    classID: '',
    parent: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      schoolID: 1,
    },
    address: {
      quarter: '',
      avenue: '',
    },
  });

  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const response = await fetchClassrooms();
        setClassrooms(response);
      } catch (error) {
        console.error('Failed to fetch classrooms', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, [fetchClassrooms]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleParentChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      parent: {
        ...prevData.parent,
        [name]: value,
      },
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Failed to submit form', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="gender"
              label="Gender"
              value={formData.gender}
              onChange={handleChange}
              fullWidth
              margin="normal"
              select
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <TextField
              name="classID"
              label="Class"
              value={formData.classID}
              onChange={handleChange}
              fullWidth
              margin="normal"
              select
            >
              {classrooms.map((classroom) => (
                <MenuItem key={classroom.classRoomID} value={classroom.classRoomID}>
                  {classroom.level} {classroom.letter} 
                </MenuItem>
              ))}
            </TextField>
          </Box>
        );
      case 1:
        return (
          <Box>
            <TextField
              name="firstName"
              label="Parent First Name"
              value={formData.parent.firstName}
              onChange={handleParentChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="lastName"
              label="Parent Last Name"
              value={formData.parent.lastName}
              onChange={handleParentChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="email"
              label="Parent Email"
              value={formData.parent.email}
              onChange={handleParentChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="phone"
              label="Parent Phone"
              value={formData.parent.phone}
              onChange={handleParentChange}
              fullWidth
              margin="normal"
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <TextField
              name="quarter"
              label="Quarter"
              value={formData.address.quarter}
              onChange={handleAddressChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="avenue"
              label="Avenue"
              value={formData.address.avenue}
              onChange={handleAddressChange}
              fullWidth
              margin="normal"
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {renderStepContent(activeStep)}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button type="submit" variant="contained" color="primary">
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

MultiStepForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  fetchClassrooms: PropTypes.func.isRequired,
};

export default MultiStepForm;
