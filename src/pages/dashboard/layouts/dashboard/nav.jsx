import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from '../../routes/hooks';
import { RouterLink } from '../../routes/components';

import { useResponsive } from '../../hooks/use-responsive';

import { account } from '../../_mock/account';

import Scrollbar from '../../components/scrollbar';

import { NAV } from './config-layout';
import navConfig from './config-navigation';
import SvgColor from '../../components/svg-color';

import './fonts.css';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();

  const upLg = useResponsive('up', 'lg');

  const icon = (name) => (
    <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  );
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        color: "white",
        bgcolor: (theme) => alpha("#F1F1F1", 1),
      }}
    >
      <Avatar src={account.photoURL} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2" sx={{ color: "#0C0C0C", fontFamily:"Mona sans" }}>{account.displayName}</Typography>

      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={1} sx={{ px: 3 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderFooterItems = (
    <Box sx={{ px: 2.5, pb: 3, mt: 2 }}>
      <Stack alignItems="center" spacing={2} sx={{ pt: 3, borderRadius: 2, position: 'relative' }}>
       
        <NavItem
          item={{
            title: 'Documentation',
            path: '/dashboard/documentation',
            icon: icon("ic_documentation"), // Documentation icon
          }}
        />
      </Stack>
    </Box>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        backgroundColor: "#FAFAFA",
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />

      {renderFooterItems}
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: { xs: 20, sm: 25, md: 30 },
        borderRadius: { xs: '20px', sm: '20px', md: '5px' },
        typography: { xs: 'body3', sm: 'body2' },
        color: '#595959',
        mt:5,
        backgroundColor: "#FAFAFA",
        textTransform: "capitalize",
        fontWeight: "bolder",
        fontFamily: 'Mona sans !important ',
        '&:hover': {
          color: "#000",
          backgroundColor: "#F1F1F1",
        },
        ...(active && {
          color: '#000',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha('#F1F1F1', 1),
          '&:hover': {
            color: '#000',
            bgcolor: (theme) => alpha("#F1F1F1", 1),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 32, height: 32, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
