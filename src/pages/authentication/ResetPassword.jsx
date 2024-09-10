import { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Container, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import {resetPassword} from './utils/resetPassword'
import {validateEmail} from './utils/validateEmail'

const MultiStepPasswordReset = () => {
  const [step, setStep] = useState(1); // Track the current step
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Logic to send reset password instructions to the email
    localStorage.setItem("user_id",validateEmail(email));
    handleNextStep();
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    // Logic to verify the code
    console.log('Verification Code:', verificationCode);
    handleNextStep();
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Logic to reset password
    console.log('New Password:', newPassword);
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match");
    } else {
      // Password reset success
      console.log('Password successfully reset');
      resetPassword(email, newPassword);
      handleNextStep(); // Proceed to success message
    }
  };

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Automatically redirect to the login page after the password is reset
  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => {
        navigate('/auth/login');
      }, 3000); // Redirect after 3 seconds
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [step, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: '#f7f7f7',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: '#fff',
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            textAlign: 'center',
          }}
        >
          {step === 1 && (
            <>
              <Typography component="h1" variant="h4" sx={{ mb: 2, fontFamily: 'Montserrat-variable', fontWeight: '500', color: 'black' }}>
                Reset Password
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: 'grey', fontFamily: 'Montserrat-variable', fontWeight: '400' }}>
                Enter the email associated with your account and we will send you instructions to reset your password.
              </Typography>
              <Box component="form" onSubmit={handleEmailSubmit}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 3 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ backgroundColor: '#6e1d36', color: '#fff', fontFamily: 'Montserrat-variable', fontWeight: '500', '&:hover': { backgroundColor: '#822341' } }}
                >
                  Send Instructions
                </Button>
              </Box>
            </>
          )}

          {step === 2 && (
            <>
              <Typography component="h1" variant="h4" sx={{ mb: 2, fontFamily: 'Montserrat-variable', fontWeight: '500', color: 'black' }}>
                Enter Verification Code
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: 'grey', fontFamily: 'Montserrat-variable', fontWeight: '400' }}>
                Please enter the verification code that was sent to your email.
              </Typography>
              <Box component="form" onSubmit={handleCodeSubmit}>
                <TextField
                  label="Verification Code"
                  fullWidth
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  sx={{ mb: 3 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ backgroundColor: '#6e1d36', color: '#fff', fontFamily: 'Montserrat-variable', fontWeight: '600', '&:hover': { backgroundColor: '#822341' } }}
                >
                  Verify Code
                </Button>
              </Box>
              <Button onClick={handlePrevStep} fullWidth sx={{ mt: 2, color: '#6e1d36' }}>
                Back
              </Button>
            </>
          )}

          {step === 3 && (
            <>
              <Typography component="h1" variant="h4" sx={{ mb: 2, color: 'black', fontFamily: 'Montserrat-variable', fontWeight: '500' }}>
                Set New Password
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: 'grey', fontFamily: 'Montserrat-variable', fontWeight: '400' }}>
                Please enter your new password below.
              </Typography>
              <Box component="form" onSubmit={handlePasswordSubmit}>
                <TextField
                  label="New Password"
                  type={showNewPassword ? 'text' : 'password'}
                  fullWidth
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  sx={{ mb: 3 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleToggleNewPasswordVisibility}>
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  fullWidth
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{ mb: 3 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleToggleConfirmPasswordVisibility}>
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ backgroundColor: '#6e1d36', color: '#fff', fontFamily: 'Montserrat-variable', fontWeight: '400', '&:hover': { backgroundColor: '#822341' } }}
                >
                  Reset Password
                </Button>
              </Box>
              <Button onClick={handlePrevStep} fullWidth sx={{ mt: 2, color: '#6e1d36' }}>
                Back
              </Button>
            </>
          )}

          {step === 4 && (
            <>
              <Typography component="h1" variant="h4" sx={{ mb: 2, color: 'black', fontFamily: 'Montserrat-variable', fontWeight: '500' }}>
                Password Reset Successful
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: 'grey', fontFamily: 'Montserrat-variable', fontWeight: '400' }}>
                Your password has been reset successfully. You will be redirected to the login page shortly.
              </Typography>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default MultiStepPasswordReset;
