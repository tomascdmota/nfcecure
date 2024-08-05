import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'products',
    path: '/dashboard/products',
    icon: icon('ic_bottle'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'settings',
    path: '/dashboard/settings',
    icon: icon('ic_blog'),
  },
  {
    title: 'Marketing (CRM)',
    path: '/dashboard/marketing',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/dashboard/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
