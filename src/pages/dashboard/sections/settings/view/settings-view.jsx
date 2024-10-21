import React, { useState, useEffect, useRef } from 'react';
import {
  Container, Typography, Stack, Switch, TextField, Button, Card, Divider,
  Grid, Avatar, IconButton, Snackbar, Alert, Dialog, DialogTitle, DialogContent,
  DialogActions, useTheme, useMediaQuery, CircularProgress
} from '@mui/material';
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Save as SaveIcon,
  Lock as LockIcon,
  ExitToApp as LogoutIcon,
  Notifications as NotificationsIcon,
  PhotoCamera as CameraIcon
} from '@mui/icons-material';

// Assume these functions are implemented elsewhere
import fetchUserSettings from '../../../../../services/userSettings';
import updateUserSettings from '../../../../../services/userSettings';
import uploadUserAvatar from '../../../../../services/userSettings';

const SettingsView = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    emailNotifications: true,
    smsNotifications: false,
    username: '',
    email: '',
    phoneNumber: '',
    avatarUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  
  const fileInputRef = useRef(null);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const userSettings = await fetchUserSettings();
        setSettings(userSettings);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load user settings:', error);
        setSnackbarMessage('Failed to load settings. Please try again.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSettingChange = (setting, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [setting]: value
    }));
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await updateUserSettings(settings);
      
      if (avatarFile) {
        await uploadUserAvatar(avatarFile);
      }

      setSnackbarMessage('Settings saved successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Failed to save settings:', error);
      setSnackbarMessage('Failed to save settings. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setSaving(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleOpenPasswordDialog = () => {
    setOpenPasswordDialog(true);
  };

  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleChangePassword = async () => {
    // Implement password change logic here
    // This should make an API call to change the password
    console.log('Password changed');
    handleClosePasswordDialog();
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" fontFamily="Mona sans" mb={3}>
        Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              sx={{ width: 100, height: 100, margin: '0 auto 16px' }}
              alt={settings.username}
              src={avatarPreview || settings.avatarUrl || "/path-to-default-avatar-image.jpg"}
            />
            <Typography variant="h6" gutterBottom>{settings.username}</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>{settings.email}</Typography>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
              accept="image/*"
            />
            <Button
              variant="outlined"
              startIcon={<CameraIcon />}
              onClick={triggerFileInput}
            >
              Change Avatar
            </Button>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" mb={2}>Profile Information</Typography>
            <Stack spacing={2}>
              <TextField
                label="Username"
                name="username"
                value={settings.username}
                onChange={(e) => handleSettingChange('username', e.target.value)}
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                value={settings.email}
                onChange={(e) => handleSettingChange('email', e.target.value)}
                fullWidth
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={settings.phoneNumber}
                onChange={(e) => handleSettingChange('phoneNumber', e.target.value)}
                fullWidth
              />
            </Stack>
          </Card>

          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" mb={2}>Security</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<LockIcon />}
              onClick={handleOpenPasswordDialog}
            >
              Change Password
            </Button>
          </Card>

          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" mb={2}>Notifications</Typography>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography>Email Notifications</Typography>
                <Switch
                  checked={settings.emailNotifications}
                  onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                />
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography>SMS Notifications</Typography>
                <Switch
                  checked={settings.smsNotifications}
                  onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                />
              </Stack>
            </Stack>
          </Card>

          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" mb={2}>Appearance</Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography>{settings.darkMode ? 'Dark' : 'Light'} Mode</Typography>
              <Switch
                checked={settings.darkMode}
                onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                icon={<LightModeIcon />}
                checkedIcon={<DarkModeIcon />}
              />
            </Stack>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Stack direction="row" justifyContent="space-between">
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={handleSaveSettings}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </Stack>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog
        fullScreen={fullScreen}
        open={openPasswordDialog}
        onClose={handleClosePasswordDialog}
        aria-labelledby="change-password-dialog"
      >
        <DialogTitle id="change-password-dialog">Change Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="new-password"
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            id="confirm-password"
            label="Confirm New Password"
            type="password"
            fullWidth
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePasswordDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleChangePassword} color="primary" variant="contained">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SettingsView;