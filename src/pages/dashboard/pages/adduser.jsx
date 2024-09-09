import { Helmet } from 'react-helmet-async';

import { AddUserView } from '../sections/user/NewUser';
import BreadcrumbsComponent from '../components/breadcrumb/breadcrumb.jsx'

// ----------------------------------------------------------------------

export default function AddUserPage() {

  const breadcrumbPaths = [
    { label: 'Users', href: '/dashboard/user' },
    { label: 'Add User', href: '/dashboard/user/create' }
  ];
  return (
    <>
      <Helmet>
        <title> Add User</title>
      </Helmet>
      <BreadcrumbsComponent paths={breadcrumbPaths} />
      <AddUserView />
    </>
  );
}
