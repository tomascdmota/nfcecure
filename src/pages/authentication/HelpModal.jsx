import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const primaryColor = '#822341';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogTitle-root': {
    backgroundColor: primaryColor,
    color: theme.palette.common.white,
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
}));

const StyledListItem = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
  '&::before': {
    content: '"•"',
    color: primaryColor,
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
  },
}));

const HelpModal = ({ open, onClose }) => {
  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
        <HelpOutlineIcon sx={{ mr: 1 }} />
        Can't sign in?
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <svg width="200" height="100" viewBox="0 0 200 100">
            <rect width="200" height="100" fill="#f3e5e9" />
            <circle cx="100" cy="50" r="40" fill={primaryColor} />
            <path d="M85 70 Q100 40 115 70" stroke="white" strokeWidth="3" fill="none" />
            <circle cx="90" cy="40" r="5" fill="white" />
            <circle cx="110" cy="40" r="5" fill="white" />
          </svg>
        </Box>
        <StyledListItem variant="body1">
          Make sure you have verified your account with the link you received in your email. If you haven't received it, contact your account owner.
        </StyledListItem>
        <StyledListItem variant="body1">
          Make sure you are using the correct username. If you're not sure what it is, ask your account owner; they will have access to it.
        </StyledListItem>
        <StyledListItem variant="body1">
          If none of this helps you, try re-setting your password.
        </StyledListItem>
        <Typography variant="body1" sx={{ mt: 2 }}>
          If you are still having trouble, contact us at{' '}
          <a href="mailto:support@whatsinmybottle.com" style={{ color: primaryColor }}>
            support@whatsinmybottle.com
          </a>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: '#6e1d36' } }}>
          Close
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default HelpModal;