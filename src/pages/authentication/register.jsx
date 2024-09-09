import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import {
  Box,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepConnector ,
  Paper,
  Grid,
  Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Person,
  Mail,
  Group,
  CheckCircle,
  ArrowBack,
} from '@mui/icons-material';


import { validateCode } from './utils/validateInvitationCode';

const steps = [
  { label: 'Your details', description: 'Provide your information', icon: <Person /> },
  { label: 'Verify your account', description: 'Enter the verification code', icon: <Mail /> },
  { label: 'Add Profile Image', description: 'Add a profile image', icon: <Group /> },
  { label: 'Welcome!', description: 'Get started with your new account', icon: <CheckCircle /> },
];

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: 'transparent',
  zIndex: 1,
  color: '#ECECEC',
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '10px',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px solid #ECECEC',
  ...(ownerState.active && {
    backgroundColor: '#6F1524',
    color: "#fff"
  }),
  ...(ownerState.completed && {
    backgroundColor: '#6F1524',
    color: "#fff"
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;
  const icons = {
    1: <Person />,
    2: <Mail />,
    3: <Group />,
    4: <CheckCircle />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
      sx={{
        width: { xs: 30, sm: 32, md: 40, lg: 50, xl: 50 }, // Adjusted responsive widths
        height: { xs: 30, sm: 32, md: 40, lg: 50, xl: 50 }, // Adjusted responsive heights
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const SignUpForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [verificationCode, setVerificationCode] = useState(Array(6).fill(''));
  const navigate = useNavigate(); 
  // Form data state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  useEffect(() => {
    if(activeStep == 4) {
      navigate("/dashboard")
      localStorage.removeItem("activeStep")
    }
  }, )
  

  // Load saved state from localStorage on component mount
  useEffect(() => {
    const savedActiveStep = localStorage.getItem('activeStep');
    const savedVerificationCode = localStorage.getItem('verificationCode');
    const savedFormData = localStorage.getItem('formData');

    if (savedActiveStep !== null) {
      setActiveStep(parseInt(savedActiveStep, 10));
    }
   

    if (savedVerificationCode) {
      setVerificationCode(JSON.parse(savedVerificationCode));
    }

    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

 

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('activeStep', activeStep);
    localStorage.setItem('verificationCode', JSON.stringify(verificationCode));
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [activeStep, verificationCode, formData]);

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);


// Function to handle input change
const handleInputChange = (index, event) => {
  const value = event.target.value;
  if (value.length <= 1) {
    const updatedCode = [...verificationCode];
    updatedCode[index] = value;
    setVerificationCode(updatedCode);

    // Auto-focus the next input (allow focusing until index 5)
    if (value && index < 5) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  }
};

// Function to handle pasting the entire code
const handlePaste = (event) => {
  const pasteData = event.clipboardData.getData('text');

  // Ensure that only numbers are pasted and trim to 6 characters if necessary
  const cleanedPasteData = pasteData.replace(/\D/g, '').slice(0, 6);

  // Split the paste data into individual characters
  const updatedCode = [...verificationCode];
  cleanedPasteData.split('').forEach((char, i) => {
    if (i < 6) {
      updatedCode[i] = char;
      document.getElementById(`code-input-${i}`).value = char; // Fill the input fields
    }
  });

  setVerificationCode(updatedCode); // Update the state with the pasted values
  event.preventDefault(); // Prevent the default paste behavior
};

  const arrayToString = (arr) => arr.join('');
  const handleVerification = async () => {
    try {
        const code = arrayToString(verificationCode); // Assuming this converts the array to a string
        const result = await validateCode(code, formData.email); // Await the validateCode function

        if (result.success) { // Check the 'success' field in the result
            handleNext();
        } else {
            // Handle errors
            console.error('Invalid invitation code');
        }
    } catch (error) {
        console.error('Error validating code:', error);
    }
};

const handleButtonClick = async () => {
  if (activeStep === 1) {
    await handleVerification();
  } 
  else if (activeStep === steps.length - 1 ) {
    navigate('/dashboard');
  } else {
    handleNext();
  }
};

  const handleFormDataChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Typography variant="h4" gutterBottom sx={{ color: '#333' }}>
              Welcome! Let's get started
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: '#666' }}>
              Please fill in your information.
            </Typography>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              required
              name="email"
              value={formData.email}
              onChange={handleFormDataChange}
            />
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              required
              name="username"
              value={formData.username}
              onChange={handleFormDataChange}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              required
              name="password"
              value={formData.password}
              onChange={handleFormDataChange}
            />
            <TextField
              fullWidth
              label="Repeat Password"
              type="password"
              variant="outlined"
              margin="normal"
              required
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleFormDataChange}
            />
          </>
        );
      case 1:
        return (
          <>
            <Typography variant="h4" gutterBottom sx={{ color: '#333' }}>
              Verify your account
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: '#666' }}>
              We've sent a verification code to your email. Please enter it below.
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {verificationCode.map((code, index) => (
                  <Grid item key={index} xs={2}>
                    <TextField
                      id={`code-input-${index}`}
                      value={code}
                      onChange={(event) => handleInputChange(index, event)}
                      onPaste={handlePaste} // Handle paste event
                      inputProps={{ maxLength: 1, style: { textAlign: 'center', fontSize: '24px', color: '#843144' } }}
                      variant="outlined"
                      required
                      autoFocus={index === 0}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#843144',
                          },
                          '&:hover fieldset': {
                            borderColor: '#843144',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#843144',
                          },
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="h4" gutterBottom sx={{ color: '#333' }}>
              Add Profile Image
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: '#666' }}>
              Add a profile image to complete your profile.
            </Typography>
            <TextField fullWidth label="Upload Image" variant="outlined" margin="normal" />
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Upload
            </Button>
          </>
        );
      case 3:
        return (
          <>
            <Typography variant="h4" gutterBottom sx={{ color: '#333', fontFamily:"Mona sans" }}>
              Welcome to What's in my bottle!
            </Typography>
            <Typography variant="body2" gutterBottom sx={{ color: '#666', fontFamily:"Mona sans" }}>
              Your account has been successfully set up. Let's get you started.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Welcome"
                style={{ maxWidth: '120%', height: 'auto', borderRadius: '15px' }}
              />
            </Box>
            <Typography variant="body2" gutterBottom sx={{ color: '#666', fontFamily:"Mona sans", fontWeight:"400", mt:2 }}>
              If you have any questions feel free to drop by the documentation page.
            </Typography>
            <Typography variant="body2" gutterBottom sx={{ color: '#666', fontFamily:"Montserrat-regular", fontWeight:"400" }}>
              You can access it from within the portal
            </Typography>
          </>
        );
      default:
        return 'Unknown step';
    }
  };
  const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
    left: '50%',
    transform: 'translateX(-50%)',
    // Additional styling if needed
  }));

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
    {/* Sidebar */}
    <Paper
      sx={{
        width: { xs: '100%', sm: '20%', md: '40%', lg: '45%', xl: '12%' }, // Responsive width with a max cap on larger screens
        pt:3,
        pl:2,
        pr:1,
        display: 'flex',
        alignItems: "start",
        flexDirection: 'column',
        backgroundColor: '#fafafa',
        border: '1px solid #e0e0e0',
        boxShadow: 'none',
        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem', lg: '1.3rem' }, // Adjusted font size
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}> {/* Center the logo */}
        <img
          src="/assets/unnamed.png" // Logo 
          alt="Welcome"
          style={{ maxWidth: '90%', height: 'auto', borderRadius: '15px' }} // Adjust logo size
        />
      </Box>
  
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        width="100%"
        connector={<CustomStepConnector />}
        sx={{
          fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem', lg: '1.3rem' }, // Adjusted font size
          mt: 5,
          '& .MuiStepLabel-label': {
            color: '#8a8a8a',
            fontWeight: '600',
            fontFamily: 'Helvetica Neue, sans-serif',
            whiteSpace: 'nowrap', // Prevent text wrapping
            overflow: 'hidden', // Hide overflowed text
            textOverflow: 'ellipsis', // Add ellipsis if text is too long
          },
          '& .MuiStepLabel-label.Mui-active': {
            color: '#000',
            fontWeight: 'bold',
          },
          '& .MuiStepLabel-label.Mui-completed': {
            color: '#000',
            fontWeight: 'bold',
          },
          '& .MuiStepIcon-root': {
            color: '#d3d3d3',
            '&.Mui-active': {
              color: '#007aff',
            },
            '&.Mui-completed': {
              color: '#007aff',
            },
          },
        }}
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              StepIconComponent={ColorlibStepIcon}
              optional={
                <Typography variant="caption" sx={{ color: '#777', fontSize: { xs: '0.53rem', sm: '0.8rem', md: "1rem" }, mt: 0 }}>
                  {step.description}
                </Typography>
              }
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Paper>
  
    {/* Main Content */}
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'white',
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: '90%', sm: '80%', md: "40%" }, // Responsive maxWidth
          width: '100%',
          p: { xs: 2, sm: 4 },
        }}
      >
        {getStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleButtonClick}
            sx={{
              width: '100%',
              backgroundColor: '#6F1524',
              '&:hover': {
                backgroundColor: '#843144',
              },
              fontSize: { xs: '1rem', sm: '1.2rem' }, // Responsive font size
            }}
          >
            {activeStep === 1 ? 'Verify account' : activeStep === steps.length - 1 ? 'Get Started' : 'Continue'}
          </Button>
        </Box>
      </Box>
    </Box>

  </Box>
  
  );
};

export default SignUpForm;

