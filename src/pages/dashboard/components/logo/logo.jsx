import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import { RouterLink } from '../../routes/components';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 120, // Increased width
        height: 80, // Increased height to accommodate larger text
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
      {...other}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 120 80" // Adjusted viewBox to match the increased size
      >
        <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#7F0239" />
            <stop offset="100%" stopColor="#7F0239" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="none" /> {/* Transparent background for better spacing */}

        <text
          x="50%"
          y="40%" // Position the "WMB" text in the upper part of the SVG
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize="36" // Increased font size for "WMB"
          fontWeight="bold"
          fill="url(#BG1)"
        >
          WMB
        </text>
        <text
          x="50%"
          y="75%" // Adjusted position for the "whats in my bottle" text
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize="14" // Increased font size for the tagline
          fontWeight="normal"
          fill="#7F0239" // Solid color for better readability
        >
          whats in my bottle
        </text>
      </svg>
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
