import { Helmet } from 'react-helmet-async';

import { SettingsView } from '../sections/settings/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Settings </title>
      </Helmet>

      <SettingsView />
    </>
  );
}
