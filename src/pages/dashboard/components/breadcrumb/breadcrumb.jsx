import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BreadcrumbsComponent = ({ paths = [] }) => { // Default to empty array
  const navigate = useNavigate();

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator=">" // Set the separator to '>'
      sx={{ 
        width: '100%', 
        padding: '8px 16px',
        color: "black",
        borderBottom: '1px solid #ddd'
      }}
    >
      {paths.length > 0 ? (
        paths.map((path, index) => {
          const isLast = index === paths.length - 1;

          return isLast ? (
            <Typography key={path.label} sx={{ color: 'black', fontWeight: 'bold' }}>
              {path.label}
            </Typography>
          ) : (
            <Link
              key={path.label}
              color="textSecondary"
              onClick={() => navigate(path.href)}
              style={{ 
                cursor: 'pointer', 
                color: 'grey', 
                textDecoration: 'none' // Remove underline
              }}
            >
              {path.label}
            </Link>
          );
        })
      ) : (
        <Typography></Typography>
      )}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;
